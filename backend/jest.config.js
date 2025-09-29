module.exports = {
    reporters: [
        'default',
        // './imj-custom-reporter.js',
        ['jest-html-reporter', {
            outputPath: './test-report.html', // Output file path
            pageTitle: 'Relatório de testes',        // Title of the HTML report
            // Other configuration options can be added here
            append: false,
            collapseSuitesByDefault: true,
            dateFormat: "dd/mm/yyyy HH:MM",
            includeFailureMsg: true,
            includeSuiteFailure: true,
            theme: "darkTheme",
        }],
    ],
};
