SELECT m.music_name AS nome, 
COUNT(h.music_id) AS reproducoes
FROM SpotifyClone.music AS m
INNER JOIN SpotifyClone.`history` AS h
ON m.music_id = h.music_id
INNER JOIN SpotifyClone.`user` AS u
ON h.user_id = u.user_id
WHERE u.membership_id = 1 OR u.membership_id = 4
GROUP BY m.music_id
ORDER BY nome;
