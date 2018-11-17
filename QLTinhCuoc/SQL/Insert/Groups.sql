INSERT dbo.Groups
        ( GroupsName ,
          Description ,
          CreateDate
        )
VALUES  ( N'Admin' , -- GroupsName - nvarchar(250)
          N'Admin' , -- Description - nvarchar(500)
          GETDATE()  -- CreateDate - datetime
        );
INSERT dbo.Groups
        ( GroupsName ,
          Description ,
          CreateDate
        )
VALUES  ( N'PM' , -- GroupsName - nvarchar(250)
          N'Project Manager' , -- Description - nvarchar(500)
          GETDATE()  -- CreateDate - datetime
        );
INSERT dbo.Groups
        ( GroupsName ,
          Description ,
          CreateDate
        )
VALUES  ( N'Manager' , -- GroupsName - nvarchar(250)
          N'Manager' , -- Description - nvarchar(500)
          GETDATE()  -- CreateDate - datetime
        );