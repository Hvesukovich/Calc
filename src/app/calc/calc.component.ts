import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-calc',
    templateUrl: './calc.component.html',
    styleUrls: ['./calc.component.css']
})
export class CalcComponent {
    public arr = [];//Массив ВСЕХ чисел введённых в одном примере
    screen_info: string = '';//Отображение вводимых данных
    // viewAct: string = '';//Отображение полностью всего примера
    act: string = '';//Проверка на нахождение действий(+-*/)
    comma: boolean = false;//Проверка на нахождении в числе запятой
    simbol: string;//Последний символ в последнем элементе массива "arr"
    characters:string;//Последний элемент в массиве "arr"
    answer = '';//Ответ.
    
    constructor() {
    }

    //Очищаю ВЕСЬ массив с числами и вывожу пример на экран (в данном случае пустоту).
    public funcClear(){
        this.arr = [];
        this.example();
        this.simbol = '';
    }

    //Удаляю последний элемнт в последнем элементе массива, Если последний элемент пустой, то удаляю последний элемент. Вывожу пример на экран
    public deleteLastCharacter(){
        if(this.arr.length > 0){
            this.arr[this.arr.length - 1] = this.arr[this.arr.length - 1].substr(0, this.arr[this.arr.length - 1].length-1);
            if(this.arr[this.arr.length - 1] == ''){
                this.arr.pop();
            }
            this.example();
        }
    }

    //Добавляю цифры
    public addNumber(number){
        if(((this.arr.length == 0) && (this.arr[0] == undefined)) || ((this.arr.length == 1) && (this.arr[0] == '0'))){
            this.arr[0] = number;
        }else if((this.arr.length == 1) && (this.arr[0] == '-0')){
            this.deleteLastCharacter();
            this.arr[this.arr.length - 1] += number;
        }else {
            this.arr[this.arr.length - 1] += number;
        }
        this.example();
    }

    //Добавляю точку для дробных значений
    public addComma(){
        let comma = '';
        if(this.arr.length > 0){
            for(let i = 0; i < this.arr[this.arr.length - 1].length; i++){
                if(this.arr[this.arr.length - 1][i] == '.'){
                    comma = '.';
                }
            }
            this.poisk();
        }

        if((this.arr.length == 0) && (this.arr[0] == undefined)){
            console.log(comma);
            console.log(this.simbol);
            this.arr[0] = '0.';
        }else if(
            (comma != '.') && (this.simbol == '-') ||
            (comma != '.') && (this.simbol == '+') ||
            (comma != '.') && (this.simbol == '*') ||
            (comma != '.') && (this.simbol == '/')
        ){
            this.arr[this.arr.length - 1] += '0.';
        }
        else if(
            (comma != '.') && (this.simbol != '-') ||
            (comma != '.') && (this.simbol != '+') ||
            (comma != '.') && (this.simbol != '*') ||
            (comma != '.') && (this.simbol != '/')
        ) {
            this.arr[this.arr.length - 1] += '.';
        }
        this.example();
    }

    //Добавляю арифметические действия
    public addAct(act){
        if(this.arr.length > 0){
            this.poisk();
        }
        if((this.arr.length == 0) && (this.arr[0] == undefined) && (act == '-')){
            this.arr[0] = '-';
        }else if(
            ((this.arr.length == 1) && (this.simbol == '-') && (act == '+'))
        ) {
            this.deleteLastCharacter();
        }
        else if(
            //сдес нужна проверка на число
            ((this.simbol == '0') && (this.characters != '0')) ||
            (this.simbol == '1') ||
            (this.simbol == '2') ||
            (this.simbol == '3') ||
            (this.simbol == '4') ||
            (this.simbol == '5') ||
            (this.simbol == '6') ||
            (this.simbol == '7') ||
            (this.simbol == '8') ||
            (this.simbol == '9')
        ){
            this.arr.push(act);
        }else if(
            (this.simbol == '-') && (this.arr.length > 1) ||
            (this.simbol == '+') && (this.arr.length > 1) ||
            (this.simbol == '*') && (this.arr.length > 1) ||
            (this.simbol == '/') && (this.arr.length > 1)
        ){
            this.deleteLastCharacter();
            this.arr.push(act);
        }
        console.log('arr = ' + this.arr);
        this.example();
    }

    //Вывод ответа
    public funcAnswer(){
        this.answer = '';
        if(this.arr.length > 0){
            this.poisk();
            for (let i = 0; i < this.arr.length; i++){
                this.answer += this.arr[i];
            }
            if(this.simbol != '.'){
                if(
                    this.simbol == '+' ||
                    this.simbol == '-' ||
                    this.simbol == '*' ||
                    this.simbol == '/'
                ) {
                    this.answer = this.answer.substr(0, this.answer.length - 1);
                }
                this.answer = eval(this.answer) + '';
                this.arr = [this.answer];
                this.example();
                this.simbol = '';
            }


        }
    }

    //Поиск последненго символа в последнем числе массива
    private poisk(){
        this.characters = this.arr[this.arr.length - 1];
        this.simbol = this.characters[this.characters.length - 1];
    }

    //Построение всего примера из массива чисел
    private example(){
        this.screen_info = '';
        for(let i = 0; i < this.arr.length; i++){
            this.screen_info += this.arr[i];
        }
    }
}
