// JavaScript Document
var cartarray = [];
var data = { "total": 0, "rows": [] };
var totalCost = 0;

$(function () {

	//grid
	$('#cartcontent').datagrid({
		singleSelect: true
	});

	if (localStorage && localStorage.getItem('cartarray')) {
		// console log localStorage.getItem('cart') value, you will see a long json string
		// parse json from sttring into an array object
		data.rows = JSON.parse(localStorage.getItem('cartarray'));//change this to 
		data.total = data.rows.length;
		for (var i = 0; i < data.total; i++) {
			var row = data.rows[i];
			cartarray.push({ name: row.name, quantity: row.quantity, price: row.price, col: row.col });
			totalCost += row.price * row.quantity;
		}
		console.log(data);
		$('#cartcontent').datagrid('loadData', data);
		$('div.cart .total').html('Total: £' + totalCost);
		// localStorage.clear();

	}



	// items to drag
	$('.item').draggable({
		revert: true,
		proxy: 'clone',
		onStartDrag: function () {
			$(this).draggable('proxy').css('z-index', 10);
		}
	});

	//item to drop
	$('.cart').droppable({
		onDrop: function (e, source) {
			var name = $(source).find('p.title').text();
			console.log(name);
			var price = $(source).find('p.title').attr("data");
			var temp = $('.title');
			var col = temp.data("col");
			addProduct(name, parseFloat(price), col);
		}
	});
});

function addProduct(name, price, col) {
	function add() {
		for (var i = 0; i < data.total; i++) {
			var row = data.rows[i];
			if (row.name == name) {
				row.quantity += 1;
				cartarray[i].quantity += 1;
				return;
			}
		}
		data.total += 1;
		//push new item to the cart array
		data.rows.push({
			name: name,
			quantity: 1,
			price: price,
			col: col
		});
		cartarray.push({ name: name, quantity: 1, price: price, col: col });
	}
	add();
	totalCost += price;
	$('#cartcontent').datagrid('loadData', data);
	$('div.cart .total').html('Total: £' + totalCost);
	vue.updateTotal(data.total);
	// add to local storage
	localStorage.setItem('cartarray', JSON.stringify(cartarray));
	//stringify js array object into json
	console.log(data);
	console.log(cartarray);

	//set or update local storage value

}

function openNav() {
	document.getElementById("mySidenav").style.width = "500px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

function clearBasket() {
	data.rows = [];
	data.total = 0;
	totalCost = 0;
	vue.clear();
	cartarray = [];

	localStorage.setItem('cartarray', JSON.stringify(cartarray));

	$('#cartcontent').datagrid('loadData', data);
	$('div.cart .total').html('Total: £' + totalCost);
	$('div.cart .total').html('Total: £' + totalCost);

}


