import { toast } from 'react-toastify';
export default function useShare() {
  const copy_to_Clipboard = (str) => {
    let textarea;
    let result;
    try {
      textarea = document.createElement('textarea');
      textarea.setAttribute('readonly', true);
      textarea.setAttribute('contenteditable', true);
      textarea.style.position = 'fixed'; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = str;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand('copy');
    } catch (err) {
      console.error(err);
      result = null;
    } finally {
      document.body.removeChild(textarea);
    }
    if (!result) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const copyHotkey = isMac ? '⌘C' : 'CTRL+C';
      result = prompt(`Press ${copyHotkey}`, str); // eslint-disable-line no-alert
      if (!result) {
        return false;
      }
    }

    return true;
  };
  const share_url = async (title, url) => {
    const shareData = {
      title,
      url
    };
    if (navigator.canShare) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.info('copied_to_clipboard');
      copy_to_Clipboard(shareData.url);
    }
  };

  // className={extraCustomClass} //extra class
  return share_url;
}
