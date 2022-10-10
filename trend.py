
class Trend:
    def __init__(self, position, title, views) -> None:
        self.position = position
        self.title = title
        self.views = views
    
    def getPosition(self):
        return self.position
    
    def getViews(self):
        return self.views
    
    def getTitle(self):
        return self.title
