export default (app) => {

    app.route('/api/intern/projects')
        .get((request, response) => {
            response.json({
                test: 'lalalal'
            });
        });
}
