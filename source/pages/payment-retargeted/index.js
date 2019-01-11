import './index.css';
import './main.scss';

function openTabs(evt, idTab) {
  var i,l, tabcontent, tablinks;

  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  tabcontent = document.getElementsByClassName('tab-pane');
  for (l = 0; l < tabcontent.length; l++) {
    tabcontent[l].className = tabcontent[l].className.replace(' active', '');
  }

  document.getElementById(idTab).className += ' active';
  evt.currentTarget.className += ' active';

}

window.openTabs = openTabs;
