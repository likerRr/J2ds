# j2Ds - игровой HTML5 движок 

![j2Ds Demo](http://cs627318.vk.me/v627318778/15345/xDlBcQExIXM.jpg)

[Лицензия и описание](https://github.com/SkanerSoft/J2ds/wiki)

Автор движка: [Skaner](https://youtube.com/SkanerSoft?sub_confirmation=1) (Нагель Петр)

Главный помощник: [likerRr](http://github.com/likerRr) (Алексей)

E-mail: skaner0@yandex.ru

vk: [vk.com/skaner.soft](http://vk.com/skaner.soft)

youtube: [youtube.com/skanersoft](https://youtube.com/SkanerSoft?sub_confirmation=1)

Сайты: [nagel-petr.ru](http://nagel-petr.ru), [skanersoft.ru](http://skanersoft.ru)


#### Если у вас возникают вопросы по работе с движком, либо у вас есть предложения, писать нужно на форум, там ответ вы получите гораздо быстрее,
чем если будете писать тут.

### [Форум j2Ds](http://skanersoft.ru/forum/3)




# Содержание:

1. [DOM](#dom)
1. [Математические операции](#math)
1. [Основы j2Ds](#j2ds)
1. [Ненужный include](#include)
1. [Локальное хранилище](#local)
1. [Размеры экрана и fullScreen()](#screen)
1. [Минимальный код](#minCode)
1. [Количество кадров в секунду (FPS)](#fps)
1. [Игровые состояния](#gameState)
1. [Сцена](#scene)
1. [Слои](#layers)
1. [Виды (ViewPorts)](#view)
1. [Устройство ввода](#input)
1. [Базовая нода](#addBaseNode)
1. [Прямоугольник](#addRectNode)
1. [Окружность](#addCircleNode)
1. [Линия](#addLineNode)
1. [Текст](#addTextNode)
1. [Спрайт-карта и анимация](#createImageMap)
1. [Анимированные объекты](#addSpriteNode)
1. [События](#events)
1. [Ввод текста с клавиатуры](#inputMode)
1. [Измерение FPS и игре](#createFpsManager)
1. [Более сложный пример](#example)


## <a name="dom"></a> DOM
Для доступа к объектам по id:

    $id('id')

Для доступа по name:

    $name('name')

Для доступа по тегу:

    $tag('div')[x]

, где x - порядковый номер найденного элемента

## <a name="math"></a> Математические операции
В j2Ds все операции над координатми и размерами рекомендуется использовать посредством 
соответствующих классов или объектов.

Для задания целочисленных координат можно использовать объект:

    j2ds.vector.vec2di(0, 0)

Для задания вещественных координат:

    j2ds.vector.vec2df(0.0, 0.0)

Для округления до целого числа можно использовать:

    parseInt(14.5)

или:

    j2ds.math.toInt(14.5)

или:

    Math.ceil(14.5)

Для Рандомизации числа:

    var num = j2ds.math.random(0, 5);

Для Рандомизации к примеру от -15 до 15:

    var num = Random(-15, 15 [, notZero]);

В случае, когда диапазон имеет отрицательные элементы, вы можете указать третий параметр как true, который не позволит функции
вернуть 0, если значение 0 вам не требуется.



Есть возможность получить рандомный цвет стандартными средствами:

    var min = 200, // минимальная граница
        max = 255, // максимальная граница
        alpha = 1; // прозрачность от 0 до 1

        var color = j2ds.math.rndColor(min, max, alpha);



Для перевода градусов в радианы:

    var num= Rad(45); // 45'


> Примечание: для быстрого доступа к этим функциям можно создать ссылки на них:

    var vec2df = j2ds.vector.vec2df;
    var Random = j2ds.math.random;
    /* и др. */


## <a name="j2ds"></a> Глобальный j2ds

Любой объект в j2Ds - это нода определенного типа, наследующая те или иные 
свойства другой (или нескольких) ноды.

Структура построения дерева зависимости:

    root
     |-j2ds
       |-device
       |-scene
         |-layers
       |-input
       |-local

j2ds - Глобальный объект, дающий доступ к API движка.

В процессе выполнения игрового цикла вам доступны следующие переменные:

    j2ds.dt              // Фактор "Delta Time"
    j2ds.countDrawNodes  // Количество нод, отрисованных в текущий момент 

Для того, чтобы просмотреть структуру объекта, можно выполнить команду:

    console.log(j2ds);




## <a name="include"></a> Ненужный include

Для динамической подгрузки и выполнения JavaScript кода можно воспользоваться 
функцией:

    j2ds.include('my_script'); // выполнение файла my_script.js

если файл находится вне текущей папки, можно перед include присовить root 
каталог для поиска скрипта:

    j2ds.root= 'my_folder/';
    j2ds.include('my_script'); // выполнение my_folder/my_script.js

> Примечание: при множественном вызове одного и того же файла он выполнится
только при первом вызове. Остальные include для этого файла будут проигнорированы.


## <a name="local"></a> Локальное хранилище

Для хранения информации есть соответствующий объект:

    var myLocal = j2ds.createLocal('test');

, где 'test' - это уникальнй id для экземпляра хранилища. Уникальный инденификатор нужен 
для того, чтобы хранить идентичные поля.

Для сохранения информации:

    myLocal.save('myName', 'Skaner');

Для сохранения ноды/объекта:

    myLocal.saveNode('myNode', idOfNode);

, где idOfNode - объект или нода.

Для проверки существования переменной в хранилище:

    myLocal.is('myName'); // true/false

Для загрузки переменной:

    myLocal.load('myName'); // Skaner

Для загрузки объекта:

    myLocal.loadNode('myNode'); // Object "idOfNode"



## <a name="screen"></a> Device

Для определения размера экрана, доступного для развертывания игры, можно использовать объект:

    var device = j2ds.device();
    
    device.width     // ширина экрана
    device.height    // высота экрана

Чтобы развернуть игру на весь экран есть специальная команда:

    j2ds.scene.fullScreen(true);

> Примечание: команда работает только после инициализации игровой сцены командой *scene.init()*.


## <a name="minCode"></a> Минимальный игровой код

Чтобы подготовить страницу для организации игрового приложения, необходимо наличие обязательных элементов:

1. Скрипт движка
1. [Функция инициализации сцены](#scene)
1. Функция, описывающая [игровое состояние](#gameState)

Код ниже представляет минимально необходимый код:
```html
<!DOCTYPE html>
<html> 
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <script type="text/javascript" src="j2ds/j2ds.js"></script>
  <title>Пример игрового кода</title>
 </head>
 <body>

<script type="text/javascript">

// Объект сцены для быстрого доступа
var scene = j2ds.scene;

// вектор для быстрого доступа
var vec2di = j2ds.vector.vec2di;

// инициализация сцены
scene.init(640, 480);

// Игровое состояние Game
var Game = function () {
 // Очищаем сцену
 scene.clear(); 
 
 /* Вся игровая логика происходит тут */
 
};

// После описания игрового состояния, оно не будет выполняться, пока игра не будет запущена.
// Для этого используется команда start:
scene.start(Game, 30); // Второй параметр - FPS
</script>

 </body>
</html>
```


## <a name="fps"></a> FPS

В игре вам часто может потребоваться ограничить Количество кадров в секунду, чтобы игра выполнялась
на одинаковой скорости при разных частотах процессора. Для этого необходимо при старте сцены
указать требуемое ограничение FPS:

    scene.start(Game, 30); // Старт игры с 30 fps

Кроме этого, вам так же доступен фактор Delta Time

    j2ds.dt // DeltaTime



## <a name="gameState"></a> Игровые состояния

В j2Ds для обработки игровой логики используется понятие "игрового состояния".
Игровое состояние - это функция, которая выполняется FPS количество раз.

Пример игрового состояния:

    var GameState = function() {
     
    };

Чтобы эта функция воспринималась движком, как игровое состояние, эту функцию нужно использовать
для старта игры, либо же установить в качестве игрового состояния функцией setGameState:
    
    // Игровое состояние 1
    var GameState1 = function() {
     if (j2ds.input.isKeyPress('SPACE')) {
      j2ds.scene.setGameState(GameState2);
     }
    };
    
    // Игровое состояние 2
    var GameState2 = function() {
     console.log('Активировано игровое состояние 2');
    };

    // Стартуем сцену с игровым состоянием 1
    j2ds.scene.start(GameState1, 25); // 25 fps



## <a name="scene"></a> Сцена

Сцена - основная нода игрового менеджера.

    // для облегчения доступа
    var scene = j2ds.scene;

### Инициализация
Чтобы инициализировать сцену и привязать ее к canvas-элементу, используется команда:

    var width = 640,  // ширина
        height = 480; // высота
    scene.init(width, height);

### Старт
Чтобы начать игровой процесс, используется команда j2ds.scene.start():

     scene.start(GameState, 25); // 25 fps

### Смена игрового состояния
Для смены текущего игрового состояния на любое другое:

    scene.setGameState(GameState2); // мгновенно переключится на GameState2

> Примечание: GameState2 - это функция, описывающая игровое состояние.

### На весь экран
Чтобы развернуть сцену на всю доступную область экрана:

    // развернуть
    scene.fullScreen(true);
    // вернуть обратно
    scene.fullScreen(false);

### Очистка сцены
В игровом состоянии, если вы отрисовываете объекты, сцену нужно очищать перед
отрисовкой, чтобы не возник эффект "рисования":

    scene.clear();

## <a name="layers"></a> Слои (Layers)

Для оптимизации производительности и снижения затрат на отрисовку статических объектов j2Ds
поддерживает возможность создания и обработки слоев.

    var scene = j2ds.scene;
    var layers = scene.layers;

### Сцена, как слой

Объект scene является центральным слоем, и новые слои можно добавлять как поверх него, так и позади.
Для определения глубины слоя используется индекс позиции:

    // Создание слоя с именем background и индексом позиции '-1',
    // Что означает, что слой будет располагаться позади основного слоя
    // на -1 уровень
    layers.add('background', -1);

Для того, чтобы расположить слой спереди, достаточно указать положительный индекс позиции.

### Доступ к слою

Для доступа к слою и его методам и свойствам используется команда:

    layers.layer('background').метод

Либо можно завести переменную для быстрого доступа:

    var myLayer = layers.add('background', -1);

И затем доступ можно осуществлять как первым методом, так и:

    myLayer.метод()




### Заливка слоя

Для заливки слоя одним цветом:

    layers.layer('background').fill('blue');

### Скрыть/показать слой

Если слой необходимо скрыть или показать:

    layers.layer('background').setVisible(true/false);

### Прозрачность слоя

Для задания прозрачности слою есть команда:

    setAlpha(0.5);

Чтобы получить прозрачность:

    getAlpha()


### Перемещение слоя

Так же слой можно перемещать вперед и назад:

    var index = 1; // переместить слой спереди сцены на 1 уровень
    layers.layer('background').setIndex(index); 

### Методы рисования

Для соев так же актуальны следующие методы:

    layers.layer('background').clear();
                              .clearNode(idNode);
                              .clearRect(pos, size);


Вы так же всегда имеете доступ к контексту слоя посредством функции onContext:

    layers.layer('background').onContext(function(context){
     context.fillStyle = 'black';
     context.fillRect(0, 0, 25, 25); // нарисует черный квадрат
    });


Пример заливки слоя градиентом:

    layers.add('back', -1);
    layers.layer('back').onContext(function (context) {
     j2ds.scene.texture.templates.gradientL(context, 
                                            vec2df(scene.width, scene.height), 
                                            ['black', 'rgba(0,0,0,0)', 'black']);
    });


> Примечание: j2ds.scene.texture.templates.gradientL(context, vec2df(width, height), colors [, izHorizontal]) - это функция
из набора [шаблонов](#texture-templates) создания текстур.


### Удаление слоя

Если требуется удалить слой:

    layers.layer('background').destroy();


> Примечание: дважды добавить слой с одним и тем же именем невозможно.



## <a name="view"></a> Виды (ViewPorts)

В j2Ds есть аналог камеры, которую можно двигать и фокусировать.

По умолчанию камера располагается в начале координат. Чтобы ее перемещать, используются
следующие команды.

### Фокусировка

    var scene = j2ds.scene;
    var pos = vec2df(600, 950);
    
    // сместить камеру на указанную позицию
    scene.setViewPosition(pos);


Так же камера может сфокусироваться на ноде:

    scene.setViewFocus(node, vec2df(offsetX, offsetY));

, где node - объект типа Node, а вторым параметром передается vec2df() для смещения.
Если второй параметр не указывать, камера сфокусируется так, что объект окажется в центре.

### Движение камеры

Так же вид камеры можно двигать:

    // если указать в игровом цикле, камера будет двигаться вправо
    scene.viewMove(vec2df(1, 0));




## <a name="input"></a> Устройства ввода

### Клавиатура

Для удобства работы с клавиатурой, тачскрином и мышью в j2Ds есть специальный объект:

    var input = j2ds.input;

Чтобы отслеживать нажатия клавиш на клавиатуре, есть специальные методы:

    var key = 'UP'; // клавиша - это обычная строка

    input.isKeyPress(key)
         .isKeyDown(key)
         .isKeyUp(key)

Все методы возаращают true/false в зависимости от состояни клавиши.

Пример:

    if (input.isKeyPress('SPASE')) {
     console.log('Нажатие клавиши "Пробел"');
    }

> Примечание: чтобы это сработало, проверки должны выполняться в пределах игровых состояний.

Так же, чтобы узнать сканкод клавиши, которая нажата в данный момент, существует специальная переменная:

    console.log(input.anyKey);

Чтобы получить список доступных для работы клавиши, есть функция:

    var array_of_keys = input.keyList();

    console.log(array_of_keys);

keyList() возвращает массив, в котором каждый элемент - это клавиша, которую можно использовать для проверки на реакцию.

### Мышь

Для работы с мышью в объекте input существуют специальные свойства и методы:

Чтобы проверить, что нажата та или иная кнопка мыши:

    // Правая КМ
    input.rClick
    // Левая КМ
    input.lClick
    // Средняя КМ
    input.mClick

Пример:

    if (input.lClick) {
     console.log('Нажата левая кнопка мыши');
    }

*Курсор* мыши - это специальный объект, хранящий в себе координаты курсора мыши.

Чтобы узнать, где находится курсор мыши, можно использовать следующие команды:

    input.getPosition() - вернет объект типа vec2di с координатами X и Y.

> Примечание: getPosition() вернет координаты с учетом смещения камеры.
Это предпочтительный способ получения координат мыши.

Однако он не подходит для определения координат курсора, проецирующихся на поверхность
игровой сцены. Для определения этих координат используется сам объект input:

    input.x,
    input.y

Пример:

    var scene = j2ds.scene;
    var input = j2ds.input;
    
    // Сдвинем камеру вправо на 100px
    scene.setViewPosition(vec2di(100, 0));
    
    // Вернет позицию курсора внутри игрового мира.
    // Если расположить курсор на 0,0 (самый левый угол),
    // то позиция курсора по X будет 100 или больше.
    console.log('Позиция курсора по X координате: ' + input.getPosition().x);
    
    // Вернет позицию курсора, проецирующуюся на сцену
    console.log('Позиция на canvas по X: ' + input.x);



### Внешний вид курсора

Если вам не нравится стандартный вид курсора, вы можете его изменить:

    input.setCursorImage('my_folder/my_image.png');


### Скрытие курсора

Если в вашей игре вам потребовалось скрыть или отобразить, есть соотвутствущая команда:

    input.setVisible(true/false);





### Тачскрин

Для определения касания, используются те же методы, что и для мыши:

    if (input.lClick) {
     concole.log('Касание');
    }

Позиция прикосновения рассчитывается аналогично через input,getPosition и input.



## <a name="addBaseNode"></a> Базовая нода

Базовая нода - это основной класс, который наследуется другими графическими объектами.
Объект базовой ноды имеет множество методов и свойств, присущий другим объектам типа Node,
и позволяет испольховать их.

Как таковой, объект BaseNode вам не пригодится, так как он не имеет функции отрисовки, однако все его 
методы наследованы другими объектами, и о них нужно знать.

### Создание

Чтобы создать объект BaseNode:

    var pos = vec2df(10, 10),  // позиция 
        size = vec2df(20, 20); // размер

    // Создание базовой ноды
    var a = scene.addBaseNode(pos, size);

Размер базовой ноде нужен для того, чтобы можно было корректно отображать Bounding-Box объектов.

### Основные свойства

Свойства объекта:

    // видимость объекта
    visible - true/false
    
    // Позиция
    pos - vec2df
    
    // Размер
    size - vec2df
    
    // Угол поворота (в градусах)
    angle
    
    // Слой для отрисовки
    layer

> Примечание: по умолчанию только созданный объект имеет слой для отрисовки - scene.

### Слои для отрисовки

Для переопределения слоя отрисовки используется команда:

    a.setLayer('background');

Чтобы узнать, какой слой используется объектом:

    var gettingLayer = a.getLayer();

> Примечание: gettingLayer в данном случае содержит строку - 'background'

### Collision-box и Bounding-box

По умолчанию все объекты имеют collision-box для определения пересечений, 
равный их bounding-box, но collision-box можно переопределить командой:

    offsetLeftTop = vec2df(5, 5); // смещение вниз и вправо
    offsetRightBottom = vec2df(-10, -10); // уменьшение размера
    a.resizeBox(offsetLeftTop, offsetRightBottom);

    /* где-то внутри игрового состояния : */
    a.drawBox();

### Скрыть/показать объект

Чтобы скрыть/отобразить объект:

    a.setVisible(true/false);

### Прозрачность

Чтоба задать прозрачность объекту, используется команда:

    a.setAlpha(0.5);

, где 0.5 - "сила" прозрачности. Аргумент принимает значения в диапазоне 0 - 1.

> Примачание: если объект полностью прозрачен (невидим), isLookScene() все равно вернет true, если он в пределах видимости сцены.

### Движение и позиция

Если необходимо двигать один объект в направлении другого, используется команда:

    var offset = vec2df(0, -10);
    a.moveTo(b, offset); // Объект a двигается к объекту b
, где offset - смещение. Если не указывать, объект а встанет точно в центр обхекта b.

Если требуется явно указать позицию объекта:

    var pos = vec2df(50, 900); // Позиция
    a.setPosition(pos);

или:

    a.setPosition(vec2df(50, 900));


Чтобы двигать объект:

    a.move(vec2df(0, 1)); // Двигает объект вниз

или:

    a.setPosition(vec2df(0, a.getPosition().y+1));


Чтобы получить текущую позицию объекта:

    var pos = a.getPosition();
    console.log(pos.x, pos.y);

### Размеры

Чтобы задать объекту нужный размер:

    a.setSize(vec2df(10, 10)); // Новый размер: 10x10 пикселей

### Расстояние между объектами

Чтобы получить расстояние между двумя объектами:

    var dist = a.getDistance(b);
    console.log(dist);

Чтобы получить дистанцию по осям, есть функция:

    var distX = a.getDistanceXY(b).x; // дистануия по оси X
    var distY = a.getDistanceXY(b).y; // по оси Y


### Пересечения

Чтобы проверить пересечения между двумя обхектами:

    a.isIntersect(b); // Вернет true, если объекты пересекаются

### Видимость в пределах сцены

Чтобы узнать, попадает ли объект в камеру, "видит ли его камера":

    a.isLookScene(); // если видим  true, иначе false

### Вращение

Если нужно вращать объект:

    a.turn(1); // вращает объект

> Примечание: можно в качестве параметра указывать любое число - это скорость вращения.
Если число положительное - по часовой стрелке, если отрицательное - против.


Чтобы задать угол вращения напрямую:

    a.setRotation(45); // повернуть объект на 45 градусов

Чтобы двигать объект в соответствии с его угом поворота:

    a.moveDir(speed);

, где speed - скорость перемещения


### Границы сцены

Так же может оказаться полезным проверка столкновения объекта с границами сцены:

    var isColl = a.isCollisionScene();
    
    console.log(isColl); // Object
    isColl.x; // Если < 0, то столкновение с левой границей, если > 0 - с правой
    isColl.y; // Если < 0, то столкновение с верхней границей, если > 0 - с нижней
    isColl.all; // Любой из вышеперечисленных


### Отображение bounding-box

Чтобы отобразить bounding-box и collision-box объекта:

    a.drawBox();

> Примечание: boundong-box рисуется черным цветом, collision-box - желтым.



## <a name="addRectNode"></a> Прямоугольник

Наследует: [BaseNode](#addBaseNode)

Для создания прямоугольника:

    var pos = vec2df(0, 0),     // Позиция
        size = vec2df(25, 40);  // Размер
        color = 'green';        // Цвет

    // Создание поямругольной ноды
    var a = scene.addRectNode(pos, size, color);

Так как объект прямоугольник графический, кроме метода 'drawBox()' для рисования box-ов у него есть еще один метод:

    a.draw();

Он рисует созданный прямогугольник на соответствующий слой в соответстуйющей позиции.



## <a name="addCircleNode"></a> Окружность

Наследует: [BaseNode](#addBaseNode)

Окружность - это потомoк объекта [BaseNode](#addBaseNode), поэтому ему доступны все его свойства и методы.

Для создания окружности:

    var pos = vec2df(0, 0),     // Позиция
        radius = 10;            // Радиус
        color = 'green';        // Цвет

    // Создание окружности
    var a = scene.addCircleNode(pos, radius, color);

Так как объект Окружность графический, кроме метода 'drawBox()' для рисования box-ов у него есть еще один метод:

    a.draw();

Он рисует созданную окружность на соответствующий слой в соответстуйющей позиции.




## <a name="addLineNode"></a> Линии

Наследует: [BaseNode](#addBaseNode)

В j2Ds есть возможность создавать объекты из линий:

    var pos = vec2df(50, 50), // Позиция
        scale = 1,            // Фактор увеличения масштаба. > 1 увеличение, < 1 уменьшение
        width = 2,            // Толщина линий
        color = 'black',      // Цвет линии
        flagFill = true,      // Флаг (true/false) заливки объекта
        colorFill = 'red';    // Если указан флаг заливки, можно назначить цвет

    var points = [];          // Массив массивов точек

    points = [ [0, 0], [10, 10], [20, 0], [10, -10], [0, 0] ];

    var a = scene.addLineNode(pos, points, scale, color, width, flagFill, colorFill); 


Для отрисовки объекта так же используется методв draw():

    a.draw();



## <a name="addTextNode"></a> Текст

Наследует: [BaseNode](#addBaseNode)

Если требуется вывести текст в вашей игре, вы можете создать соответствующий объект TextNode:

    var pos = vec2df(50, 50), // Позиция
        text = 'Привет Мир!\nЭто будет уже с новой строки\nИ это тоже.',
        size = 15, // размер текста
        color = 'red',
        family = 'sans-serif';
    var a = scene.addTextNode(pos, text, size, color, family);


Если текст требуется изменить, есть команда:

    a.setText('Новый текст');

Для получения текста:

    a.getText(); // 'Новый текст'

Для задания нового размера текста:

    a.setSize(18);

Чтобы узнать размер:

    a.getSize(); // 18

Для вывода текста:

    a.draw();

Если вам требуется выводить динамический текст, который часто изменяется и его не требуется обрабатывать (не важен размер или контейнер):

    a.drawSimpleText('Пример вывода простого текста\nНовая строка поддерживается.' [, color, vec2df(0, 0)]);

, где [, color, vec2df(0, 0)] - необязательные параметры для нового цвета и новой позиции. 

> Примечание: drawSimpleText() не изменяет стиль текста и его позицию, а так же сам текст и его размер.

## <a name="createImageMap"></a> Спрайт-карта


В j2Ds есть возможность использовать спрайты, как объекты, взаимодействующие с игровым миром, но для их создания
требуется специально подготовленной изображение - спрайт-карта.
> Пример спрайт-карты: ![sptiteMap](http://spritedatabase.net/files/mobile/1356/Sprite/PS-OfficerNiao.png)

Формат такой спрайт-карты имеет только одно обязательное условия: *кадры должны располагаться горизонтально!*

j2Ds позволяет вам загружать такие спрайт карты через объект scene.texture.

Для загрузки спрайт-карты есть специальная команда:

    var imageMap = scene.texture.loadImageMap('my_folder/my_image.png');

Этой командой изображение станет доступным для обработки внутри движка.


Кроме того, вы можете низкоуровневым способом создавать свои собственные спрайт-карты средствами движка. Для этого есть команда:

    var width = 400,
        height = 100;
    
    var createImg = function(context) {
     for (var i = 0; i < 400; i+=100) {
      context.fillStyle = j2ds.math.rndColor(100, 250, 1);
      context.fillRect(i, 0, i+100, 100);
     }
    }

    var imageMap = scene.texture.createImageMap(width, height, createImg);


Ну или же передать все параметры непосредственно в функцию:


    var imageMap = scene.texture.createImageMap(400, 100, function(context) {
     for (var i = 0; i < 400; i+=100) {
      context.fillStyle = j2ds.math.rndColor(100, 250, 1);
      context.fillRect(i, 0, i+100, 100);
     }
    });

Функция "конструктор" для текстуры принимает лишь один параметр - ссылку на контекст новой текстуры и сама же его воссоздает.


Но сам по себе объект imageMap ни с чем не может взаимодействовать, это просто подготовленный объект для взятия из него
необходимых спрайтов или анимаций. Чтобы "извлечь" анимацию или картинку из него, есть команда:

<a name="addSpriteNode-anim"></a>

    var sourceX = 0,    // Позиция первого кадра по X
        sourceY = 0,    // Позиция первого кадра по Y
        sourceH = 60,   // Высота первого кадра
        sourceW = 30;   // Ширина первого кадра
        frameCount = 1; // Количеество кадров, если это анимация
    
    // Создание анимации
    var anim = imageMap.getAnimation(sourceX, sourceY, sourceW, sourceH, frameCount);

> Примечание: Теперь такую анимацию можно передать в качестве аргумента для вывода на слой/сцену.
> Примечание № 2: sourceX,Y,W,H не должны выходить за пределы изображения




## <a name="addSpriteNode"></a> Анимированные объекты

Наследует: [BaseNode](#addBaseNode)

Чтобы игра была насыщенней, в j2Ds есть возможность использовать не только прямоугольники и круги, вы так же можете
использовать изображения из спрайт-карт.

Для создания спрайта существует команда:

    var pos = vec2df(10, 15);   // Позиция
        size = vec2df(30, 60);  // Размер

    var a = scene.addSpriteNode(pos, size, anim);

, где [anim](#addSpriteNode-anim) - анимация на основе спрайт-карты

Для отрисовки спрайта есть несколько методов:

    // Чтобы нарисовать любой один кадр анимации
    a.drawFrame(2); // Рисует второй кадр
    
    // Для отрисовки анимации целиком
    a.draw();
    
    // Если нужно замедлить скорость анимации, можно в метод draw() передать кол-во кадров, которые будут пропускаться
    a.draw(15); // При 30 fps анимация работает на скорость 30-15 FPS, то есть медленнее.

Если вы создали объект, и указали в качестве анимации 'anim1', и в процессе игры вам потребуется изменить анимацию
(прим.: уничтожение врага - взрыв), есть команда:

    a.setAnimation(amin2); // Присвоит анимацию anim2 спрайту.



## <a name="events"></a> События

В j2Ds есть понятие - событие. Оно определяет какой-то определенный момент в выполнении программы, и позволяет при наступлении этого момента
определить какое-либо поведение движка. 
На данные момент имеются следующие события (выполняются в порядке перечисления):

* scene:beforeInit - перед инициализацией
* scene:afterInit - после инициализзации, но ДО формирования документа
* dom:loaded - сразу же после формирования документа
* scene:beforeStart - перед запуском игрового цикла
* scene:afterStart - сразу же после его запуска
 
Следующие два события срабатывают во время выполнения игры 
 
* [writeMode:keyPress](#inputMode) - при вводе любого символа с клавиатуры в write-mode режиме
* scene:changedGameState - при смене игрового состояния командой setGameState

## <a name="inputMode"></a> Чтение клавиатуры

Допустим ситацию, что в вашей игре есть таблица рекордов, и по окончанию игры пользователю предлагается ввести свое имя.
Для этого есть специальная возможность считывать вводимые с клавиатуры символы:

    var io = j2ds.input;

    var textBuffer = ''; // буффер для текста

    // устанавливаем обработчик события ввода символа
    j2ds.on('writeMode:keyPress', function (symbol) {
     // дописываем введенный символ 
     textBuffer += symbol;
     // если нажали клавигу "Backspace", то удаляем последний символ (коррекция ввода)
     if (io.isKeyPress('BACKSPACE')) {
      textBuffer= textBuffer.substring(0, textBuffer.length - 1);
     }
     // если нажали "Enter" - отправляем имя на сервер
     if (io.isKeyPress('ENTER') && textBuffer) {
      console.log(textBuffer);
      textBuffer= '';
     }
    });

Обработчик принимает функцию, которая принимает единственный аргумент - введенный символ.
Называться он может как угодно. 

При этом важно, чтобы этот обработчик сработал, необходимо включить 'write-mode' объекта j2ds.input:

    io.setWriteMode(true);

После того, как ввод текста завершен и больше считывание клавиатуры не трубется, его можно отключить:

    io.setWriteMode(false);

Чтобы проверить, включен ли режим ввода, есть функция:

    io.isWriteMode()


> Примечание: если write-mode движка не включен, обработчик не выполнится.

За один вызов функции-обработчика передается один символ. Поэтому для ввода желательно использовать какоу-нибудь
буфер или переменную.




## <a name="texture-templates"></a> Шаблоны текстурирования

В j2Ds вы можете вместо загрузки ткстуры из файла создавать ее "на лету" командой createImageMap, или же закрасить слой по шаблону
командой onContext, которые принимают лишь один аргумент - это контекст для отрисовки. Внутри этих функций вы можете использовать шаблоны 
текстурирования.

Начинается любой шаблон командой j2ds.scene.texture.templates.названиеШаблона, где "названиеШаблона" - это функция текстурирования:

* j2ds.scene.texture.templates.ellips(context, vec2df(width, height), color) - Рисует эллипс
* j2ds.scene.texture.templates.fillRect(context, vec2df(width, height), color) - Рисует прямоугольник закрашенный
* j2ds.scene.texture.templates.strokeRect(context, vec2df(width, height), color, lineWidth) - Рисует пустой прямоугольник
* j2ds.scene.texture.templates.gradientL(context, vec2df(width, height), colors [, izHorizontal]) - Рисует линейный градиент, colors - массив цветов
* j2ds.scene.texture.templates.gradientR(context, vec2df(width, height), vec2df(x1, y1), r1, vec2df(x2, y2), r2, colors) - Рисует радиальный градиент, colors - массив цветов





## <a name="createFpsManager"></a> Измерение FPS в игре

На этапе разработке полезным бывает измерение FPS для оптимизации скоростей и рассчета производительности вашей игры.
Для этого вы можете воспользоваться специальным менеджером FPS.

Первое, что необходимо - это подключение файла с классом менеджера:

```html
<script type="text/javascript" src="j2ds/fps.js"></script>
```

Затем объявляем экземпляр класса:

    var fps= createFpsManager();

Теперь устанавливаем границы измерения FPS:

    var myGameState= function() {

    fps.start();

    /* игровая логика текущего игрового состояния */

    fps.end();
    };

Количество кадров будет рассчитываться между start() и end() командами.

Для получения значения fps:

    fps.getFPS()

Пример вывода:

    scene.drawText(vec2df(10, 40), 'Текущий FPS: ' + fps.getFPS(), 'green');

> Примечание: getFPS() можно вызывать в любом месте, даже перед fps.end(), рассчет будет корректным. 

## <a name="example"></a> Более сложный пример:

```html



```

