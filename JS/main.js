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
            tabContent[b].classList.remove('hide'); // в этом классе прописано display: none
            tabContent[b].classList.add('show');  // в этом классе прописано display: flex
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

//Таймер

    let deadLine = '2021-12-24'; // записываем дату до которой будет идти таймер

    function getTimeRemaining(deadLine) {
        let t = Date.parse(deadLine) - Date.parse(new Date()), // нахождение разницы между нужной нам даты в будущем и даты нынешней(находится с помощью new Date())
            seconds = Math.floor(( t/ 1000) % 60), // t делим на тысячу для получения секунд, а не миллисекунд; и получаем отстаток от деления для вычисления количества секунд
            minutes = Math.floor(( t / 1000 / 60) % 60), 
            hours = Math.floor(( t / (1000 * 60 * 60))); // t делим на 3,600,000 миллисекунд для вычисления поличесва часов

            return { // возвращаем целый объект и в него записываем данные
                'total': t, // кол-во миллисекунд
                'hours': hours, 
                'minutes': minutes,
                'seconds': seconds
            };
    }

    function setClock(id, deadLine) { // передадим два аргумента, id элемента для записи данных и нужное нам время
        let timer = document.getElementById(id), // находим на странице элемент с помощью переданного в функцию id
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeInterval = setInterval(updateClock, 1000); // как аргумент передаем функцию с обновлением раз в одну секунду

        function updateClock() {
            let t = getTimeRemaining(deadLine); // в переменную t записываем объект возвращенный функцией getTimeRemaining
            hours.textContent = t.hours; // записываем в блок hours данные из полученного объекта
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            function addZero(num) { // функция принимает один аргумент 
                if (num <= 9){
                    return '0' + num; // возвращает нам 0 + переданный аргумент
                } else return num;
            };

            hours.textContent = addZero(t.hours); // вызываем функицию с переданным в нее значением
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) { // если разница в дате будущей и настоящей меньши или равна нулю, то функция перестанет обновляться и во всех блоках будут выводиться нули
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            } 
        }
    }

    setClock('timer', deadLine); // вызываем функцию создающую нам таймер и передаем в нее id нужного нам элемента и время до которого идет отсчет


});