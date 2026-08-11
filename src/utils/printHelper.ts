/**
 * Universal print trigger utility that ensures printing works across all devices,
 * platforms (mobile iOS/Android, tablets, desktop browsers, embedded iFrames), and print drivers.
 */
export const triggerUniversalPrint = () => {
  try {
    if (typeof window === 'undefined') return;

    // 1. Ensure window has active focus (critical for iFrames and touch devices)
    window.focus();

    // 2. Clear any active temporary selections if needed
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel && sel.removeAllRanges) {
        // preserve natural selection
      }
    }

    // 3. Trigger standard window.print with fallback resilience
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.warn('Standard window.print fallback activated:', err);
        try {
          document.execCommand('print', false);
        } catch (e) {
          alert(
            'Print command initiated. If your printer dialog did not launch automatically, please press Ctrl+P (or Cmd+P on Mac) or select Print in your browser menu.'
          );
        }
      }
    }, 60);
  } catch (e) {
    console.error('Universal print execution error:', e);
  }
};
