let app;
let initError = null;

try {
    const module = await import('../server/server.js');
    app = module.default;
} catch (error) {
    initError = error;
    console.error('Server Init Failed:', error);
}

export default async function handler(req, res) {
    if (initError) {
        return res.status(500).json({
            error: 'Server initialization failed',
            message: initError.message,
            stack: initError.stack,
            type: 'INIT_ERROR'
        });
    }

    if (!app) {
        return res.status(500).json({
            error: 'App not initialized',
            type: 'NO_APP'
        });
    }

    return app(req, res);
}

