<?php
header("Content-Type: application/json");
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$role = $data['role'];
$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email' AND role='$role'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if ($password == $user['password']) {

        echo json_encode([
            "status" => "success",
            "user" => $user
        ]);

    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Wrong password"
        ]);
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "User not found or role mismatch"
    ]);
}
?>