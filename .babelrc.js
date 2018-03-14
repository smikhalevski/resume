module.exports = {
  presets: [
    ['@babel/preset-env', {'loose': true}],
    '@babel/preset-react',
    '@babel/preset-flow',
    '@babel/preset-stage-0'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};
