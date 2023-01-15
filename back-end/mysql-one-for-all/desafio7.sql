SELECT art.artist_name AS artista,
alb.album_name AS album,
COUNT(fol.artist_id) AS seguidores
FROM SpotifyClone.artist AS art
INNER JOIN SpotifyClone.album AS alb
ON art.artist_id = alb.artist_id
INNER JOIN SpotifyClone.`following` AS fol
ON art.artist_id = fol.artist_id
GROUP BY artista, album
ORDER BY seguidores DESC, artista, album;
