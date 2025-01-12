import type {HandlerEvent} from '@netlify/functions'

export const getClientIp = (event: HandlerEvent): string => {
    // Check x-forwarded-for header first (handles proxies)
    const forwardedFor = event.headers['x-forwarded-for']
    if (forwardedFor) {
        // Get the first IP in the list (original client IP)
        return forwardedFor.split(',')[0].trim()
    }

    // Fall back to other headers
    return event.headers['client-ip'] ||
        event.headers['x-real-ip'] ||
        event.headers['x-client-ip'] ||
        'unknown'
}

export const getEnvironmentInfo = () => {
    // NETLIFY is 'true' when running on Netlify
    const isNetlify = process.env.NETLIFY === 'true';

    // CONTEXT can be 'production', 'deploy-preview', or 'branch-deploy'
    const context = process.env.CONTEXT || 'development';

    // BRANCH shows the git branch (only in Netlify environment)
    const branch = process.env.BRANCH;

    // SITE_NAME is your Netlify site name
    const siteName = process.env.SITE_NAME;

    return {
        environment: isNetlify ? 'production' : 'development',
        context,
        branch,
        siteName
    };
};
