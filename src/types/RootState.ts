import { ThemeState } from 'styles/theme/slice/types';
import { ChatOptionsState } from 'app/pages/Chat/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  theme?: ThemeState;
  chatOptions?: ChatOptionsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
