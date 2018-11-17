USE PowerCall
GO
/*
Author: Dungdv24
Desc:  10/11/2018
Desc: Lấy thông tin loại đầu số
*/
ALTER PROCEDURE Call_GetTypeFixedDialName
AS
BEGIN
SELECT TypeFixedDialID,TypeFixedDialName FROM dbo.TypeFixedDial(NOLOCK)
END

