SELECT u.user_name AS usuario,
COUNT(h.user_id) AS qt_de_musicas_ouvidas,
ROUND(SUM(m.duration) / 60, 2) AS total_minutos
FROM SpotifyClone.`user` AS u
INNER JOIN SpotifyClone.`history` AS h
ON u.user_id = h.user_id
INNER JOIN SpotifyClone.music AS m
ON h.music_id = m.music_id
GROUP BY u.user_id
ORDER BY usuario;
