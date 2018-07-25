class Config():
    def __init__(self):
        self.base

    @staticmethod
    def init_app(app):
        app.config['MYSQL_DATABASE_HOST'] = 'beenthere.c96fpbfeupce.us-east-2.rds.amazonaws.com'
        app.config['MYSQL_DATABASE_PORT'] = 3306
        app.config['MYSQL_DATABASE_USER'] = 'hanx0621'
        app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
        app.config['MYSQL_DATABASE_DB'] = 'beenthere'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
        app.config['WX_APPID'] = 'wx06ecc62f568b317f'
        app.config['WX_SECRET'] = 'c99528c1af5f23f40f3a3712b612e8b5'
        # 域名 beenthere.space
