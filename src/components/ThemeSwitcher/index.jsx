import React from 'react';

const themes = {
  default: {
    label: 'Default',
    'data-bs-theme': 'light',
    'data-theme': 'material',
    'data-color': 'sky',
  },
  github: {
    label: 'GitHub-like',
    'data-bs-theme': 'dark',
    'data-theme': 'flat',
    'data-color': 'terminal',
  },
  facebook: {
    label: 'Facebook-like',
    'data-bs-theme': 'light',
    'data-theme': 'material',
    'data-color': 'ocean',
  },
  chatgpt: {
    label: 'ChatGPT-like',
    'data-bs-theme': 'dark',
    'data-theme': 'flat',
    'data-color': 'aurora',
  },
};

function ThemeSwitcher() {
  const handleThemeChange = (e) => {
    const themeKey = e.target.value;
    const theme = themes[themeKey];

    localStorage.setItem('theme', theme['data-bs-theme']);
    localStorage.setItem('uiTheme', theme['data-theme']);
    localStorage.setItem('colorTheme', theme['data-color']);

    window.location.reload();
  };

  const currentThemeKey = Object.keys(themes).find(key => {
    const theme = themes[key];
    return (
      localStorage.getItem('theme') === theme['data-bs-theme'] &&
      localStorage.getItem('uiTheme') === theme['data-theme'] &&
      localStorage.getItem('colorTheme') === theme['data-color']
    );
  }) || 'default';

  return (
    <div className="mb-3">
      <label htmlFor="theme-switcher" className="form-label">Theme</label>
      <select id="theme-switcher" className="form-select" onChange={handleThemeChange} defaultValue={currentThemeKey}>
        {Object.entries(themes).map(([key, theme]) => (
          <option key={key} value={key}>{theme.label}</option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSwitcher;
