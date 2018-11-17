USE PowerCall
GO
/*
Author: Dungdv24
Desc: 07/11/2018
Desc: Lấy thông tin Loại dịch vụ
*/
CREATE PROCEDURE Call_GetTypeCall
AS
BEGIN
SELECT TypeCallID,NameTypeCall FROM dbo.TypeCall(NOLOCK)
END

