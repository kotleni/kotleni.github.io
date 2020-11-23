import pygame
import math as Math

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

FPS = 60
WIN_WIDTH = 600
WIN_HEIGHT = 400
viewLen = 22
fov = 20

pygame.init()

d = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))
clock = pygame.time.Clock()

level = [
    {'x': 10, 'y': 10, 'w': 80, 'h': 5},
    {'x': 10, 'y': 90, 'w': 75, 'h': 5},
    {'x': 10, 'y': 30, 'w': 10, 'h': 70},
    {'x': 40, 'y': 60, 'w': 20, 'h': 20},
    {'x': 60, 'y': 30, 'w': 15, 'h': 40},
    ]

player = [ 50, 50, 0 ]

scale = 10
while 1:
    d.fill(BLACK)
    pygame.draw.rect(d, WHITE, (0, 0, 100, 100), 1) # рамка

    for o in level:
        pygame.draw.rect(d, LIGHT_BLUE, (o['x'], o['y'], o['w'], o['h']))

    i = 0
    while i < fov:
        i += 1
        for h in range(viewLen):
            xx = player[0] + Math.sin((player[2] + i ) / 10) * h
            yy = player[1] + Math.cos((player[2] + i ) / 10) * h
            c = d.get_at((int(xx), int(yy)))[:3]
            if c[0] == LIGHT_BLUE[0]:
                if c[1] == LIGHT_BLUE[1]:
                    if c[2] == LIGHT_BLUE[2]:
                        l = h / viewLen * 255
                        
                        #pygame.draw.rect(d, WHITE, ( xx, yy, 1, 1))
                        pygame.draw.rect(d, (l, l, l), ( 100 + (i * scale), 100 - h, scale, 200 + h))

                        break
            #pygame.draw.line(d, PINK, [player[0], player[1]], [xx, yy], 1)

    
    csize = 5
    pygame.draw.rect(d, YELLOW, (WIN_WIDTH / 2 - csize, WIN_HEIGHT / 2 - csize, csize, csize), 1)

    pygame.display.update()
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            pygame.quit()
        
    if pygame.key.get_pressed()[pygame.K_a]:
        player[2] -= 1

    if pygame.key.get_pressed()[pygame.K_d]:
        player[2] += 1

    if pygame.key.get_pressed()[pygame.K_w]:
        player[0] += Math.sin((player[2] + (fov/2)) / 10) * 5.0 * 0.1
        player[1] += Math.cos((player[2]+ (fov/2)) / 10) * 5.0 * 0.1

    if pygame.key.get_pressed()[pygame.K_s]:
        player[0] -= Math.sin((player[2]+ (fov/2)) / 10) * 5.0 * 0.1
        player[1] -= Math.cos((player[2]+ (fov/2)) / 10) * 5.0 * 0.1

    clock.tick(FPS)