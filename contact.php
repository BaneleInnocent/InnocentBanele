<?php
// Optional PHP mail handler. Configure $TO and your SMTP/sendmail before deploy.
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'method not allowed']); exit;
}

$TO = 'banele@example.com'; // <-- replace
$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$message = trim($_POST['message'] ?? '');

if (!$name || !$email || !$message) {
  http_response_code(400);
  echo json_encode(['error' => 'missing fields']); exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'invalid email']); exit;
}

$subject = "Portfolio contact — $name";
$body    = "From: $name <$email>\n\n$message\n";
$headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n" .
           "Reply-To: $email\r\n" .
           "X-Mailer: PHP/" . phpversion();

$ok = @mail($TO, $subject, $body, $headers);
echo json_encode(['ok' => (bool)$ok]);
