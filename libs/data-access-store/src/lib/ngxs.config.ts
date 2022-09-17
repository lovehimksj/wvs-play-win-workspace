import { NgxsModuleOptions } from '@ngxs/store';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: false,
  selectorOptions: {
    // These Selector Settings are recommended in preparation for NGXS v4
    // (See above for their effects)
    suppressErrors: false, 
    injectContainerState: true
  },
  compatibility: {
    strictContentSecurityPolicy: true
  },
  // Execution strategy overridden for illustrative purposes
  // (only do this if you know what you are doing)
  //executionStrategy: NoopNgxsExecutionStrategy
};
