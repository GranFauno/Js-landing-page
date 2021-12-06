window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) { // скрывает все элементы tabContent на странице, в качестве аргумента передаем номер элемнта с которого нчать(он скрыт не будет)
        for (let i = a; i < tabContent.length; i++) { //начинаем выполнять цикл с переданного индекса
            tabContent[i].classList.remove('show'); // убираем класс 'show'
            tabContent[i].classList.add('hide'); // добавляем класс 'hide'
        }
    }

    hideTabContent(1); // скрыть все элементы, начиная с индекса 1

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) { // проверяем действительно ли выбранный элемент скрыт
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');  
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){ // используем делегирование событий если кликаем на область info И в области клика есть класс info-header-tab, то выполняем слудующее 
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]){ // если объект клика совпадает перебираемым табом
                    hideTabContent(0); // скрываем все табы на странице
                    showTabContent(i); // показываем таб, который совпадает при перебирании
                    break; // заканчиваем выполнение цикла досрочно если 
                }
            }
        }
    });
});