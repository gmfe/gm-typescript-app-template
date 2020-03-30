module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['test', 'build', 'deps', 'fix', 'revert', 'temporary']],
    },
}
