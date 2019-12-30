import math
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])

z = '49*x*x-9.8*x+0.49*y*y-6.86*y+24.5'
epx = 0.001
x0 = 5
y0 = 5

a1 = 49
a2 = -9.8
b1 = 0.49
b2 = -6.86
c1 = 24.5


def f(x, y):
    return a1*x*x+a2*x+b1*y*y+b2*y+c1


def f2(x, y):
    return 98*x - 9.8 + 0.98*y - 6.86


def dif_x(x):
    return 2 * a1 * x + a2


def dif_y(y):
    return 2 * b1 * y + b2


def mnc(point: Point):
    count = 0
    step_points = []
    while True:
        step_points.append(point)
        grad = Point(dif_x(point.x), dif_y(point.y))
        if math.sqrt(grad.x ** 2 + grad.y ** 2) <= eps:
            print(count)
            print(f(*point))
            return step_points
        lam = (2 * a1 * grad.x * point.x + a2 * grad.x + b2 * grad.y + 2 * b1 * grad.y * point.y) / \
              (2 * a1 * grad.x ** 2 + b1 * 2 * grad.y ** 2)
        point = Point(point.x - grad.x * lam, point.y - grad.y * lam)
        count += 1


def mnc_const_step(point: Point, h):
    count = 0
    step_points = []
    z_old_val = f(*point)
    while True:
        step_points.append(point)
        grad = Point(dif_x(point.x), dif_y(point.y))
        if math.sqrt(grad.x ** 2 + grad.y ** 2) <= eps:
            print(count)
            print(f(*point))
            return step_points
        origin_point = point
        while True:
            point = Point(origin_point.x - grad.x * h,
                          origin_point.y - grad.y * h)
            z_val = f(*point)
            if z_val > z_old_val:
                h /= 2
            else:
                break
        count += 1
        z_old_val = z_val


def mcn(A):
    k = 0
    while True:
        if math.sqrt(dif_x(A.x) ** 2 + dif_y(A.y) ** 2) <= eps:
            print(k)
            print(f(*A))
            return A
        if k % 2 != 0:
            p = Point(0, 1)
            h = (-2 * b1 * A.y - b2) / (2 * b1)
        else:
            p = Point(1, 0)
            h = (-2 * a1 * A.x - a2) / (2 * a1)
        A = Point(A.x + p.x * h, A.y + p.y * h)
        k += 1


M0 = Point(5, 5)
eps = 0.001
print(mnc(M0)[-1])
print(mnc_const_step(M0, 0.5)[-1])
print(mcn(M0))
