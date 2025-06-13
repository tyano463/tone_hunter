import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  checkPermission(cb: (err: Int32, result: boolean) => void): void
  measureStart(tone: Int32): void
  confirmed(order: Int32, cb: (err: Int32, result: string) => void): void
  measureStop(): void
  test(): void
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeInterface');