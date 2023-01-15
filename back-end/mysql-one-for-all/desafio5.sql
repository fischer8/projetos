SELECT m.music_name AS cancao,
COUNT(h.music_id) AS reproducoes
FROM SpotifyClone.music AS m
INNER JOIN SpotifyClone.`history` AS h
ON m.music_id = h.music_id
GROUP BY cancao
ORDER BY reproducoes DESC, cancao
LIMIT 2;
