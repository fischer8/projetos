SELECT COUNT(music_id) AS cancoes,
COUNT(DISTINCT(artist_id)) AS artistas,
COUNT(DISTINCT(album_id)) AS albuns
FROM SpotifyClone.music;
