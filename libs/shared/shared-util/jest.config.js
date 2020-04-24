module.exports = {
  name: 'shared-shared-util',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/shared-util',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
