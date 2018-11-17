USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Thêm mới số nội bộ
*/
CREATE PROCEDURE Call_GetServiceProvider
AS
BEGIN
SELECT * FROM dbo.ServiceProvider(NOLOCK)
END

