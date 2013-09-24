<?php


class Database {

	public function __construct() {
		$db = mysql_connect("localhost", "root", "", "kroketweb");
		mysql_select_db("kroketweb");

		// var_dump(mysql_errno()." :: ".mysql_error());
	}

	public function getArticles($start) {
		$articles = array();

		$start = (isset($start)) ? $start -1 : 0;
		$start = $start * 10;

		$query = "SELECT * FROM product LIMIT ".$start.", 10";
//		var_dump($query);
		$result = mysql_query($query);
		while($row = mysql_fetch_assoc($result)) {
			$articles[] = $row;
		}

		return $articles;
	}

	public function amountOfArticles(){
		$query = "SELECT COUNT(id) as amount FROM product";
		$amount = 0;
		$result = mysql_query($query);
		$row = mysql_fetch_assoc($result);
		$amount = $row['amount'];

		return (int) $amount;
	}	
}

?>