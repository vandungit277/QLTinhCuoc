USE PowerCall
GO
/*
Author: Dungdv24
Desc: 11/11/2018
Desc: Danh sách Group
*/
ALTER PROCEDURE Call_ListGroup
AS
    BEGIN
        SELECT  GroupsID ,
                GroupsName ,
                Status ,
                CreateBy ,
                Description ,
                CONVERT(VARCHAR(10), CreateDate, 103) AS CreateDate
        FROM    dbo.Groups(NOLOCK)
    END

	