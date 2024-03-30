require('dotenv').config();

module.exports = {
    apps: [{
        name: 'helldivers2-bot',
        script: './app.js',
        instances: 1,
        watch: false,
        max_memory_restart: '150M'
    }],
    env_production: {
        NODE_ENV: 'production'
    },
    deploy: {
        production: {
            'user': process.env.PM2_DEPLOY_USER,
            'host': process.env.PM2_DEPLOY_IP,
            'port': process.env.PM2_DEPLOY_PORT,
            'ref': 'origin/master',
            'repo': 'git@github.com:EdouardCourty/helldivers2-bot',
            'path': '/var/www/helldivers2-bot',
            'post-deploy': 'yarn install && cp /var/www/helldivers2-bot/.env /var/www/helldivers2-bot/current/.env && pm2 startOrRestart ecosystem.config.cjs --env production'
        }
    }
}
