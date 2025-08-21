# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated testing and deployment.

## E2E Tests Workflow (`e2e-tests.yml`)

### Triggers
- **Pull Requests**: Runs when a PR is opened, updated, or synchronized targeting the `main` branch
- **Push**: Runs when commits are pushed directly to the `main` branch

### What it does
1. **Setup Environment**
   - Checks out the code
   - Sets up Node.js 18 with npm caching
   - Installs dependencies (using --legacy-peer-deps to resolve React 19 RC compatibility)

2. **Prepare Application**
   - Installs Playwright browsers and dependencies
   - Starts the development server (faster for testing)

3. **Run Tests**
   - Waits for the application to be ready
   - Executes all E2E tests using Playwright
   - Runs in CI mode for optimized performance

4. **Report Results**
   - Uploads Playwright HTML report as an artifact
   - Uploads test traces (only on failure) for debugging

### Test Results
- **HTML Report**: Available as an artifact after the workflow completes
- **Traces**: Available for failed tests to help with debugging
- **Retention**: Reports kept for 30 days, traces for 7 days

### Configuration
- **Timeout**: 30 minutes maximum execution time
- **Browsers**: Chromium, Firefox, and WebKit (mobile + desktop)
- **Parallel**: Tests run in parallel for faster execution

### Viewing Results
1. Go to the Actions tab in your GitHub repository
2. Click on the completed workflow run
3. Download the "playwright-report" artifact
4. Open `index.html` in your browser to view detailed test results

### Local Testing
To test the workflow locally before pushing:
```bash
# Install dependencies (use legacy peer deps if you encounter React version conflicts)
npm ci --legacy-peer-deps

# Start the development server
npm run dev

# In another terminal, run tests
npm run test:e2e
```

The workflow ensures that all E2E tests pass before any changes can be merged to main, maintaining code quality and preventing regressions.