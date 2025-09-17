module.exports = {
    reporters: [
        'default',
        ['jest-html-reporter', {
            outputPath: './test-report.html', // Output file path
            pageTitle: 'Relatório de testes',        // Title of the HTML report
            // Other configuration options can be added here
            append: true,
            collapseSuitesByDefault: true,
            dateFormat: "dd/mm/yyyy HH:MM",
            includeFailureMsg: true,
            includeSuiteFailure: true,
        }],
    ],
};
