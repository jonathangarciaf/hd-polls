// Paste the Apps Script web-app URL (ends in /exec) here after deploying apps_script/Code.gs.
const SCRIPT_URL = 'PASTE_APPS_SCRIPT_EXEC_URL_HERE';

// One entry per lecture poll. The survey link is survey.html?poll=<key>,
// the results link is results.html?poll=<key>.
const POLLS = {
  w2: {
    title: 'Human Development, Week 2: Concepts',
    questions: [
      {
        id: 'cloud',
        type: 'words',
        text: 'If you had only one number to tell whether a country is developing, which would you pick?',
        hint: 'One or two words. You can send up to three answers.',
        max: 3
      },
      {
        id: 'choice',
        type: 'choice',
        text: 'Which of these would you pick as the one number for development?',
        options: [
          'GDP',
          'GDP per capita',
          'Human Development Index (HDI)',
          'Multidimensional Poverty Index (MPI)',
          'Happiness index'
        ]
      }
    ]
  }
};
