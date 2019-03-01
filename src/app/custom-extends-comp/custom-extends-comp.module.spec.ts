import { CustomExtendsCompModule } from './custom-extends-comp.module';

describe('CustomExtendsCompModule', () => {
  let customExtendsCompModule: CustomExtendsCompModule;

  beforeEach(() => {
    customExtendsCompModule = new CustomExtendsCompModule();
  });

  it('should create an instance', () => {
    expect(customExtendsCompModule).toBeTruthy();
  });
});
