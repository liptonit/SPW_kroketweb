<?php
    require_once('database.php');
    $database = new Database(); 
    $articles = $database->getArticles($_GET['page']);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Welkom bij KroketWeb - Bestel je vette hap online</title>
    <link href="css/default.css" rel="stylesheet" type="text/css"/>
    <script src="js/script.js" ></script>
</head>

<body>
    <div class="top">
        <img src="images/logo.jpg" alt="">
    </div>

    <div class="left">
        <span class="sponsortitle">Menu</span>
        <nav>
            <a href="index.html">Home</a>
            <a class="active" href="assortiment.php">Assortiment</a>
            <a href="afrekenen.html">Afrekenen</a>
        </nav>

        <h3>Inhoud winkelmandje</h3>
        <table id="shoppingcar">
            <thead>
                <tr>
                    <th>Artikel</th>
                    <th>Aantal</th>
                    <th>Prijs per stuk</th>
                    <th>Totaalprijs</th>
                </tr>
            </thead>
            <tbody></tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Totaal</td>
                    <td id="totaltotal">0</td>
                </tr>
            </tfoot>
        </table>

    </div>

    <div class="middle">
        <h3>Overzicht producten</h3>

        <div id="berichtenNavigatie"></div>
        <table id="itemlist">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Prijs (euro)</th>
                    <th>Op voorraad</th>
                    <th>Bestelling</th>
                </tr>

            </thead>
            <tbody>
                <?php
                    foreach($articles as $mainKey => $mainValue) {
                        echo '
                            <tr>
                                <td id="productname">'.$mainValue['omschrijving'].'</td>
                                <td id="price">'.$mainValue['prijs'].'</td>
                                <td id="stack">'.$mainValue['voorraad'].'</td>
                                <td id="amount">
                                    <input type="text" size="3"/>
                                </td>
                            </tr>
                        ';
                    }

                ?>
            </tbody>
            

        </table>

        <div style"margin: 0 auto;">
                   
            <?php
                $times = $database->amountOfArticles() / 10;
                for($i=0; $i<$times; $i++) {
                    $pager = "";
                    if($_GET['page'] == $i+1 || !isset($_GET['page'])) {
                        $pager = "<a href='assortiment.php?page=".($i+1)."'><b>".($i+1)."</b></a>";
                    } else {
                        $pager ="<a href='assortiment.php?page=".($i+1)."'>".($i+1)."</a>";
                    }

                    $pager .= " | ";
                    echo $pager;
                    // echo ($_GET['page'] == 1 || !isset($_GET['page'])) ? "<a href='assortiment.php?page=".$i+1."'><b>".$i+1."</b></a>" : "<a href='assortiment.php?page=1'>".$i+1."</a> | ";
                }

            ?>
                    
               
                        <?php
                            // echo ($_GET['page'] == 1 || !isset($_GET['page'])) ? "<a href='assortiment.php?page=1'><b>1</b></a>" : "<a href='assortiment.php?page=1'>1</a>";
                            // echo " | ";
                            // echo ($_GET['page'] == 2 ) ? "<a href='assortiment.php?page=2'><b>2</b></a>" : "<a href='assortiment.php?page=2'>2</a>";
                            // echo " | ";
                            // echo ($_GET['page'] == 3 ) ? "<a href='assortiment.php?page=3'><b>3</b></a>" : "<a href='assortiment.php?page=3'>3</a>";
                            // echo ($_GET['page'] == 3 ) ? "<a href='assortiment.php?page=3'><b>3</b></a>" : "<a href='assortiment.php?page=3'>3</a>";

                        ?>

        </div>

    </div>

    <aside>

        <span class="sponsortitle">Sponsors</span>
        <ul class="sponsorlist">
            <li>
                <a href="http://www.remia.nl">Lemia: Vool de lekkelste flietsaus</a>
            </li>
            <li>
                <a href="http://www.mola.nl">Mola snacks: eerlijk en lekker</a>
            </li>
            <li>
                <a href="http://www.arts.nl">Sonya Backer: Snacken is gezond</a>
            </li>
        </ul>

    </aside>
</body>
</html>