module.exports = {
  name: 'virtual11',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/virtual11',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
