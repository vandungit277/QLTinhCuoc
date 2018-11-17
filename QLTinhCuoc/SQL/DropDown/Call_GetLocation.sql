USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Lấy thông tin tỉnh thành
*/
ALTER PROCEDURE Call_GetLocation
AS
BEGIN
SELECT LocationID,LocationName FROM dbo.Location(NOLOCK) WHERE Status =1
END

