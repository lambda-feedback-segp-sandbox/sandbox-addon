// These stories show the Input component in isolation.

import {
  StudentViewStory,
  TeacherViewStory,
  createMeta,
} from '@lambda-feedback/response-area-template-lib/stories/Input.stories'


export default {
  ...createMeta(() => new window['RA_replaceme']()),
  // You can add custom story metadata here.
  // See https://storybook.js.org/docs/writing-stories#default-export.
}

// Managed by response-area-template-lib.
export const StudentView = StudentViewStory

// Managed by response-area-template-lib.
export const TeacherView = TeacherViewStory

// You can add your own stories here.
// See https://storybook.js.org/docs/writing-stories#how-to-write-stories.
