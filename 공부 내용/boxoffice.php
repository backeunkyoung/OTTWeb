<?php


$host = '127.0.0.1';
$user = 'root';
$pw = 'root';
$dbName = 'test';
$conn = mysqli_connect($host,$user,$pw, $dbName);


    $sql = "SELECT * FROM boxoffice ORDER BY rnum*1";
    
    $result = mysqli_query($conn, $sql);
    $table_row = '';

    while($row = mysqli_fetch_array($result)){
        $table_row = $table_row."<tr> <th>".$row['rnum']."</th> <td>".$row['rank']."</td> <td> ".$row['openDt']."</td><td>".$row['movieCd']."</td><td>".$row['movieNm']."</td>";
    }
    

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>박스오피스</title>
</head>
<body>

    <h2> 박스오피스 순위 </h2>
    <table border="1">
        <thead>
            <tr><th>순번</th><th>순위</th><th>개봉일</th><th>대표코드</th><th>영화제목</th></tr>
        </thead>
        <tbody>
            <?php
                echo $table_row;
            ?>
        </tbody>
    
</form>
</p>
</body>
</html>