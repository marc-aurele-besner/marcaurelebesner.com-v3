import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// `vi.mock` is hoisted above the imports, so the `send` function needs to
// be hoisted via `vi.hoisted` so the mock factory can capture it.
const sendMock = vi.hoisted(() => vi.fn());

// Use a class so `new Resend(...)` returns an instance with stable identity
// across invocations — and so the production code's chained access
// (`resend.emails.send(...)`) consistently calls our shared spy.
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

const { sendContactEmail } = await import("./contact");

function makeFormData(
  values: Partial<Record<"name" | "email" | "message", string>>,
) {
  const fd = new FormData();
  if (values.name !== undefined) fd.append("name", values.name);
  if (values.email !== undefined) fd.append("email", values.email);
  if (values.message !== undefined) fd.append("message", values.message);
  return fd;
}

describe("sendContactEmail", () => {
  beforeEach(() => {
    sendMock.mockReset();
    // Silence "Resend error:" / "Error sending email:" output during test runs.
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("validation", () => {
    it("returns an error when name is missing", async () => {
      const result = await sendContactEmail(
        makeFormData({ email: "a@b.com", message: "hi" }),
      );
      expect(result).toEqual({
        success: false,
        error: "All fields are required",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns an error when email is missing", async () => {
      const result = await sendContactEmail(
        makeFormData({ name: "Marc", message: "hi" }),
      );
      expect(result).toEqual({
        success: false,
        error: "All fields are required",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns an error when message is missing", async () => {
      const result = await sendContactEmail(
        makeFormData({ name: "Marc", email: "a@b.com" }),
      );
      expect(result).toEqual({
        success: false,
        error: "All fields are required",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns an error when all fields are missing", async () => {
      const result = await sendContactEmail(makeFormData({}));
      expect(result).toEqual({
        success: false,
        error: "All fields are required",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns an error when email is not in a valid format", async () => {
      const result = await sendContactEmail(
        makeFormData({ name: "Marc", email: "not-an-email", message: "hi" }),
      );
      expect(result).toEqual({
        success: false,
        error: "Invalid email address",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });

    it("returns an error for emails missing a domain dot", async () => {
      const result = await sendContactEmail(
        makeFormData({ name: "Marc", email: "marc@example", message: "hi" }),
      );
      expect(result).toEqual({
        success: false,
        error: "Invalid email address",
      });
      expect(sendMock).not.toHaveBeenCalled();
    });
  });

  describe("Resend integration", () => {
    it("sends the email and returns the data on success", async () => {
      sendMock.mockResolvedValueOnce({ data: { id: "msg_123" }, error: null });

      const result = await sendContactEmail(
        makeFormData({
          name: "Marc",
          email: "marc@example.com",
          message: "Hello\nWorld",
        }),
      );

      expect(sendMock).toHaveBeenCalledTimes(1);
      const payload = sendMock.mock.calls[0][0];
      expect(payload.replyTo).toBe("marc@example.com");
      expect(payload.subject).toBe("New contact form submission from Marc");
      // HTML body should escape the newline as <br>.
      expect(payload.html).toContain("Hello<br>World");
      expect(result).toEqual({ success: true, data: { id: "msg_123" } });
    });

    it("falls back to onboarding@resend.dev from address when env is unset", async () => {
      const previousFrom = process.env.RESEND_FROM_EMAIL;
      delete process.env.RESEND_FROM_EMAIL;

      sendMock.mockResolvedValueOnce({ data: { id: "msg_xyz" }, error: null });

      try {
        await sendContactEmail(
          makeFormData({
            name: "Marc",
            email: "marc@example.com",
            message: "hi",
          }),
        );

        const payload = sendMock.mock.calls[0][0];
        expect(payload.from).toBe("Contact Form <onboarding@resend.dev>");
      } finally {
        if (previousFrom !== undefined) {
          process.env.RESEND_FROM_EMAIL = previousFrom;
        }
      }
    });

    it("returns a generic error when Resend reports a failure", async () => {
      sendMock.mockResolvedValueOnce({
        data: null,
        error: { name: "validation_error", message: "bad recipient" },
      });

      const result = await sendContactEmail(
        makeFormData({
          name: "Marc",
          email: "marc@example.com",
          message: "hi",
        }),
      );

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        error: "Failed to send email. Please try again.",
      });
    });

    it("catches and reports thrown errors from Resend", async () => {
      sendMock.mockRejectedValueOnce(new Error("network down"));

      const result = await sendContactEmail(
        makeFormData({
          name: "Marc",
          email: "marc@example.com",
          message: "hi",
        }),
      );

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        success: false,
        error: "An unexpected error occurred. Please try again.",
      });
    });
  });
});
