import scipy as sp
import matplotlib.pyplot as plt
import math
from math import sqrt

x = [-10, -9, -8.1, -7, -6, -5, -4.2, -3, -2, -1, 0, 1, 2, 3.1, 4, 5, 6.2, 7, 8]
y = [77, 63.7, 52.927, 41.3, 32.2, 24.5, 19.348, 13.3, 9.8,
     7.7, 7, 7.7, 9.8, 13.727, 18.2, 24.5, 33.908, 41.3, 51.8]
a = 0.6017
b = 0.009663
c = 5.996
eps = 0.001

def f(i):
    return 0.6017 * i * i - 0.009663 * i + 5.996


def sven(h, x0):
    y_centre = f(x0)
    y_left = f(x0 - h)
    y_right = f(x0 + h)
    if y_left >= y_centre <= y_right:
        return x0 - h, x0 + h
    if y_left <= y_centre >= y_right:
        raise IndexError
    a0, b0, xk, delta = 0, 0, 0, 0
    if y_left >= y_centre >= y_right:
        a0 = x0
        xk = x0 + h
        delta = h
    else:
        b0 = x0
        xk = x0 - h
        delta = -h
    k = 1
    while True:
        x_k1 = xk + (2 ** k) * delta
        if f(x_k1) < f(xk):
            if delta == h:
                a0 = xk
            else:
                b0 = xk
            xk = x_k1
        else:
            if delta == h:
                b0 = x_k1
            else:
                a0 = x_k1
            return a0, b0


def bisection(left, right):
    iter = 0
    print('bisection')
    while abs(right - left) / 2 > 2 * eps:
        iter += 1
        x_current = left + (right - left) / 2
        left, right = (left, x_current) if f(left) < f(x_current) else (x_current, right)
    res = (left + right) / 2
    print('Result: {} Iteration: {}\n'.format(res, iter))
    return res


def passive_search(left, right):
    print('passive_search')
    iter = 0
    l = left
    c = left + eps
    r = c + eps
    while r < right:
        iter += 1
        if f(l) > f(c) < f(r):
            print('Result: {} Iteration: {}\n'.format(c, iter))
            return c
        l = c
        c = r
        r = r + eps


def golden_ratio(l, r):
    print('golden_ratio')
    phi = (1 + math.sqrt(5)) / 2
    resphi = 2 - phi
    x1 = l + resphi * (r - l)
    x2 = r - resphi * (r - l)
    f1 = f(x1)
    f2 = f(x2)
    iterat = 0
    while True:
        iterat += 1
        if f1 < f2:
            r = x2
            x2 = x1
            f2 = f1
            x1 = l + resphi * (r - l)
            f1 = f(x1)
        else:
            l = x1
            x1 = x2
            f1 = f2
            x2 = r - resphi * (r - l)
            f2 = f(x2)
        if abs(r - l) <= eps:
            print('Result: {} Iteration: {}\n'.format((x1 + x2) / 2, iterat))
            return (x1 + x2) / 2


def fib(n):
    return ((1 + sqrt(5)) ** n - (1 - sqrt(5)) ** n) / (2 ** n * sqrt(5))


def search_fib(l, r, n=10):
    print('search_fib')
    iter = 1
    while True:
        fiban = fib(n - iter + 1)
        delta = (-1) ** (n - iter + 1) * eps / fiban
        x1 = l + fib(n - iter - 1) * (r - l) / fiban - delta
        x2 = l + fib(n - iter) * (r - l) / fiban - delta
        if f(x1) >= f(x2):
            l = x1
        else:
            r = x2
        iter += 1
        if abs(f(r) - f(l) < eps):
            print('Result: {} Iteration: {}\n'.format((r + l) / 2, iter))
            return (r + l) / 2




a, b = sven(0.1, x[0])
print(a)
print(b)
bisection(a, b)
passive_search(a, b)
golden_ratio(a, b)
search_fib(a, b)
