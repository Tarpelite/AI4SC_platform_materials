module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '424px': '424px',
        'full-input': '748px'
      },
      height: {
        'dialog-content': '460px'
      },
      colors: {
        theme: '#66f',
        error: '#f5222d',
        success: '#67c23a'
      },
      margin: {
        d5: '40px',
        d4: '4px',
        d8: '8px',
        d12: '12px',
        d16: '16px',
        d20: '20px',
        d24: '24px',
        d28: '28px',
        d32: '32px',
        d36: '36px',
        d40: '40px'
      },
      padding: {
        d4: '4px',
        d8: '8px',
        d12: '12px',
        d16: '16px',
        d20: '20px',
        d24: '24px',
        d28: '28px',
        d32: '32px',
        d36: '36px',
        d40: '40px'
      },
      zIndex: {
        max: 99999
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
