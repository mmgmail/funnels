import createMenu from '../../components/menu/menu';
import './index.scss';

var menu = createMenu(['Главная','Блог'], 'menu');
document.body.appendChild(menu);
console.log('in index.js');
// console.log($);
// console.log(jQuery);
function merge(a, b){
  return {
    ...a,
    ...b
  };
}
console.log(merge(
  {a:1},
  {b:2}
));
