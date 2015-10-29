/**
 * Created by ThomasJohnsen on 23.10.2015.
 */
// Three.js r40 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
if (!window.Int32Array) {
    window.Int32Array = Array;
    window.Float32Array = Array
}
THREE.Color = function (b) {
    this.setHex(b)
};
THREE.Color.prototype = {
    copy: function (b) {
        this.r = b.r;
        this.g = b.g;
        this.b = b.b;
        this.hex = b.hex
    }, setHex: function (b) {
        this.hex = ~~b & 16777215;
        this.updateRGB()
    }, setRGB: function (b, d, c) {
        this.r = b;
        this.g = d;
        this.b = c;
        this.updateHex()
    }, setHSV: function (b, d, c) {
        var f, g, h, j, k, m;
        if (c == 0)f = g = h = 0; else {
            j = Math.floor(b * 6);
            k = b * 6 - j;
            b = c * (1 - d);
            m = c * (1 - d * k);
            d = c * (1 - d * (1 - k));
            switch (j) {
                case 1:
                    f = m;
                    g = c;
                    h = b;
                    break;
                case 2:
                    f = b;
                    g = c;
                    h = d;
                    break;
                case 3:
                    f = b;
                    g = m;
                    h = c;
                    break;
                case 4:
                    f = d;
                    g = b;
                    h = c;
                    break;
                case 5:
                    f = c;
                    g = b;
                    h = m;
                    break;
                case 6:
                case 0:
                    f = c;
                    g = d;
                    h = b
            }
        }
        this.setRGB(f,
            g, h)
    }, updateHex: function () {
        this.hex = ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
    }, updateRGB: function () {
        this.r = (this.hex >> 16 & 255) / 255;
        this.g = (this.hex >> 8 & 255) / 255;
        this.b = (this.hex & 255) / 255
    }, clone: function () {
        return new THREE.Color(this.hex)
    }
};
THREE.Vector2 = function (b, d) {
    this.set(b || 0, d || 0)
};
THREE.Vector2.prototype = {
    set: function (b, d) {
        this.x = b;
        this.y = d;
        return this
    }, copy: function (b) {
        this.set(b.x, b.y);
        return this
    }, addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y);
        return this
    }, add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y);
        return this
    }, subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y);
        return this
    }, sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y);
        return this
    }, multiplyScalar: function (b) {
        this.set(this.x * b, this.y * b);
        return this
    }, negate: function () {
        this.set(-this.x, -this.y);
        return this
    }, unit: function () {
        this.multiplyScalar(1 /
            this.length());
        return this
    }, length: function () {
        return Math.sqrt(this.lengthSq())
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y
    }, clone: function () {
        return new THREE.Vector2(this.x, this.y)
    }
};
THREE.Vector3 = function (b, d, c) {
    this.set(b || 0, d || 0, c || 0)
};
THREE.Vector3.prototype = {
    set: function (b, d, c) {
        this.x = b;
        this.y = d;
        this.z = c;
        return this
    }, copy: function (b) {
        this.set(b.x, b.y, b.z);
        return this
    }, add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y, b.z + d.z);
        return this
    }, addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y, this.z + b.z);
        return this
    }, addScalar: function (b) {
        this.set(this.x + b, this.y + b, this.z + b);
        return this
    }, sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y, b.z - d.z);
        return this
    }, subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y, this.z - b.z);
        return this
    }, cross: function (b,
                        d) {
        this.set(b.y * d.z - b.z * d.y, b.z * d.x - b.x * d.z, b.x * d.y - b.y * d.x);
        return this
    }, crossSelf: function (b) {
        var d = this.x, c = this.y, f = this.z;
        this.set(c * b.z - f * b.y, f * b.x - d * b.z, d * b.y - c * b.x);
        return this
    }, multiply: function (b, d) {
        this.set(b.x * d.x, b.y * d.y, b.z * d.z);
        return this
    }, multiplySelf: function (b) {
        this.set(this.x * b.x, this.y * b.y, this.z * b.z);
        return this
    }, multiplyScalar: function (b) {
        this.set(this.x * b, this.y * b, this.z * b);
        return this
    }, divideSelf: function (b) {
        this.set(this.x / b.x, this.y / b.y, this.z / b.z);
        return this
    }, divideScalar: function (b) {
        this.set(this.x /
            b, this.y / b, this.z / b);
        return this
    }, negate: function () {
        this.set(-this.x, -this.y, -this.z);
        return this
    }, dot: function (b) {
        return this.x * b.x + this.y * b.y + this.z * b.z
    }, distanceTo: function (b) {
        return Math.sqrt(this.distanceToSquared(b))
    }, distanceToSquared: function (b) {
        var d = this.x - b.x, c = this.y - b.y;
        b = this.z - b.z;
        return d * d + c * c + b * b
    }, length: function () {
        return Math.sqrt(this.lengthSq())
    }, lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }, lengthManhattan: function () {
        return this.x + this.y + this.z
    }, normalize: function () {
        var b =
            this.length();
        b > 0 ? this.multiplyScalar(1 / b) : this.set(0, 0, 0);
        return this
    }, setPositionFromMatrix: function (b) {
        this.x = b.n14;
        this.y = b.n24;
        this.z = b.n34
    }, setRotationFromMatrix: function (b) {
        var d = Math.cos(this.y);
        this.y = Math.asin(b.n13);
        if (Math.abs(d) > 1.0E-5) {
            this.x = Math.atan2(-b.n23 / d, b.n33 / d);
            this.z = Math.atan2(-b.n12 / d, b.n11 / d)
        } else {
            this.x = 0;
            this.z = Math.atan2(b.n21, b.n22)
        }
    }, setLength: function (b) {
        return this.normalize().multiplyScalar(b)
    }, isZero: function () {
        return Math.abs(this.x) < 1.0E-4 && Math.abs(this.y) <
            1.0E-4 && Math.abs(this.z) < 1.0E-4
    }, clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
};
THREE.Vector4 = function (b, d, c, f) {
    this.set(b || 0, d || 0, c || 0, f || 1)
};
THREE.Vector4.prototype = {
    set: function (b, d, c, f) {
        this.x = b;
        this.y = d;
        this.z = c;
        this.w = f;
        return this
    }, copy: function (b) {
        this.set(b.x, b.y, b.z, b.w || 1);
        return this
    }, add: function (b, d) {
        this.set(b.x + d.x, b.y + d.y, b.z + d.z, b.w + d.w);
        return this
    }, addSelf: function (b) {
        this.set(this.x + b.x, this.y + b.y, this.z + b.z, this.w + b.w);
        return this
    }, sub: function (b, d) {
        this.set(b.x - d.x, b.y - d.y, b.z - d.z, b.w - d.w);
        return this
    }, subSelf: function (b) {
        this.set(this.x - b.x, this.y - b.y, this.z - b.z, this.w - b.w);
        return this
    }, multiplyScalar: function (b) {
        this.set(this.x *
            b, this.y * b, this.z * b, this.w * b);
        return this
    }, divideScalar: function (b) {
        this.set(this.x / b, this.y / b, this.z / b, this.w / b);
        return this
    }, lerpSelf: function (b, d) {
        this.set(this.x + (b.x - this.x) * d, this.y + (b.y - this.y) * d, this.z + (b.z - this.z) * d, this.w + (b.w - this.w) * d)
    }, clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
};
THREE.Ray = function (b, d) {
    this.origin = b || new THREE.Vector3;
    this.direction = d || new THREE.Vector3
};
THREE.Ray.prototype = {
    intersectScene: function (b) {
        return this.intersectObjects(b.objects)
    }, intersectObjects: function (b) {
        var d, c, f, g = [];
        d = 0;
        for (c = b.length; d < c; d++) {
            f = b[d];
            f instanceof THREE.Mesh && (g = g.concat(this.intersectObject(f)))
        }
        g.sort(function (h, j) {
            return h.distance - j.distance
        });
        return g
    }, intersectObject: function (b) {
        function d(H, C, U, D) {
            D = D.clone().subSelf(C);
            U = U.clone().subSelf(C);
            var V = H.clone().subSelf(C);
            H = D.dot(D);
            C = D.dot(U);
            D = D.dot(V);
            var O = U.dot(U);
            U = U.dot(V);
            V = 1 / (H * O - C * C);
            O = (O * D - C * U) * V;
            H = (H * U - C * D) * V;
            return O > 0 && H > 0 && O + H < 1
        }

        var c, f, g, h, j, k, m, o, t, u, w, p = b.geometry, A = p.vertices, I = [];
        c = 0;
        for (f = p.faces.length; c < f; c++) {
            g = p.faces[c];
            u = this.origin.clone();
            w = this.direction.clone();
            m = b.matrixWorld;
            h = m.multiplyVector3(A[g.a].position.clone());
            j = m.multiplyVector3(A[g.b].position.clone());
            k = m.multiplyVector3(A[g.c].position.clone());
            m = g instanceof THREE.Face4 ? m.multiplyVector3(A[g.d].position.clone()) : null;
            o = b.matrixRotationWorld.multiplyVector3(g.normal.clone());
            t = w.dot(o);
            if (b.doubleSided ||
                (b.flipSided ? t > 0 : t < 0)) {
                o = o.dot((new THREE.Vector3).sub(h, u)) / t;
                u = u.addSelf(w.multiplyScalar(o));
                if (g instanceof THREE.Face3) {
                    if (d(u, h, j, k)) {
                        g = {distance: this.origin.distanceTo(u), point: u, face: g, object: b};
                        I.push(g)
                    }
                } else if (g instanceof THREE.Face4 && (d(u, h, j, m) || d(u, j, k, m))) {
                    g = {distance: this.origin.distanceTo(u), point: u, face: g, object: b};
                    I.push(g)
                }
            }
        }
        return I
    }
};
THREE.Rectangle = function () {
    function b() {
        h = f - d;
        j = g - c
    }

    var d, c, f, g, h, j, k = !0;
    this.getX = function () {
        return d
    };
    this.getY = function () {
        return c
    };
    this.getWidth = function () {
        return h
    };
    this.getHeight = function () {
        return j
    };
    this.getLeft = function () {
        return d
    };
    this.getTop = function () {
        return c
    };
    this.getRight = function () {
        return f
    };
    this.getBottom = function () {
        return g
    };
    this.set = function (m, o, t, u) {
        k = !1;
        d = m;
        c = o;
        f = t;
        g = u;
        b()
    };
    this.addPoint = function (m, o) {
        if (k) {
            k = !1;
            d = m;
            c = o;
            f = m;
            g = o
        } else {
            d = d < m ? d : m;
            c = c < o ? c : o;
            f = f > m ? f : m;
            g = g > o ? g : o
        }
        b()
    };
    this.add3Points = function (m, o, t, u, w, p) {
        if (k) {
            k = !1;
            d = m < t ? m < w ? m : w : t < w ? t : w;
            c = o < u ? o < p ? o : p : u < p ? u : p;
            f = m > t ? m > w ? m : w : t > w ? t : w;
            g = o > u ? o > p ? o : p : u > p ? u : p
        } else {
            d = m < t ? m < w ? m < d ? m : d : w < d ? w : d : t < w ? t < d ? t : d : w < d ? w : d;
            c = o < u ? o < p ? o < c ? o : c : p < c ? p : c : u < p ? u < c ? u : c : p < c ? p : c;
            f = m > t ? m > w ? m > f ? m : f : w > f ? w : f : t > w ? t > f ? t : f : w > f ? w : f;
            g = o > u ? o > p ? o > g ? o : g : p > g ? p : g : u > p ? u > g ? u : g : p > g ? p : g
        }
        b()
    };
    this.addRectangle = function (m) {
        if (k) {
            k = !1;
            d = m.getLeft();
            c = m.getTop();
            f = m.getRight();
            g = m.getBottom()
        } else {
            d = d < m.getLeft() ? d : m.getLeft();
            c = c < m.getTop() ? c : m.getTop();
            f = f > m.getRight() ?
                f : m.getRight();
            g = g > m.getBottom() ? g : m.getBottom()
        }
        b()
    };
    this.inflate = function (m) {
        d -= m;
        c -= m;
        f += m;
        g += m;
        b()
    };
    this.minSelf = function (m) {
        d = d > m.getLeft() ? d : m.getLeft();
        c = c > m.getTop() ? c : m.getTop();
        f = f < m.getRight() ? f : m.getRight();
        g = g < m.getBottom() ? g : m.getBottom();
        b()
    };
    this.instersects = function (m) {
        return Math.min(f, m.getRight()) - Math.max(d, m.getLeft()) >= 0 && Math.min(g, m.getBottom()) - Math.max(c, m.getTop()) >= 0
    };
    this.empty = function () {
        k = !0;
        g = f = c = d = 0;
        b()
    };
    this.isEmpty = function () {
        return k
    }
};
THREE.Matrix3 = function () {
    this.m = []
};
THREE.Matrix3.prototype = {
    transpose: function () {
        var b, d = this.m;
        b = d[1];
        d[1] = d[3];
        d[3] = b;
        b = d[2];
        d[2] = d[6];
        d[6] = b;
        b = d[5];
        d[5] = d[7];
        d[7] = b;
        return this
    }, transposeIntoArray: function (b) {
        var d = this.m;
        b[0] = d[0];
        b[1] = d[3];
        b[2] = d[6];
        b[3] = d[1];
        b[4] = d[4];
        b[5] = d[7];
        b[6] = d[2];
        b[7] = d[5];
        b[8] = d[8];
        return this
    }
};
THREE.Matrix4 = function (b, d, c, f, g, h, j, k, m, o, t, u, w, p, A, I) {
    this.set(b || 1, d || 0, c || 0, f || 0, g || 0, h || 1, j || 0, k || 0, m || 0, o || 0, t || 1, u || 0, w || 0, p || 0, A || 0, I || 1);
    this.flat = Array(16);
    this.m33 = new THREE.Matrix3
};
THREE.Matrix4.prototype = {
    set: function (b, d, c, f, g, h, j, k, m, o, t, u, w, p, A, I) {
        this.n11 = b;
        this.n12 = d;
        this.n13 = c;
        this.n14 = f;
        this.n21 = g;
        this.n22 = h;
        this.n23 = j;
        this.n24 = k;
        this.n31 = m;
        this.n32 = o;
        this.n33 = t;
        this.n34 = u;
        this.n41 = w;
        this.n42 = p;
        this.n43 = A;
        this.n44 = I;
        return this
    }, identity: function () {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    }, copy: function (b) {
        this.set(b.n11, b.n12, b.n13, b.n14, b.n21, b.n22, b.n23, b.n24, b.n31, b.n32, b.n33, b.n34, b.n41, b.n42, b.n43, b.n44);
        return this
    }, lookAt: function (b, d, c) {
        var f = THREE.Matrix4.__v1,
            g = THREE.Matrix4.__v2, h = THREE.Matrix4.__v3;
        h.sub(b, d).normalize();
        if (h.length() === 0)h.z = 1;
        f.cross(c, h).normalize();
        if (f.length() === 0) {
            h.x += 1.0E-4;
            f.cross(c, h).normalize()
        }
        g.cross(h, f).normalize();
        this.n11 = f.x;
        this.n12 = g.x;
        this.n13 = h.x;
        this.n21 = f.y;
        this.n22 = g.y;
        this.n23 = h.y;
        this.n31 = f.z;
        this.n32 = g.z;
        this.n33 = h.z;
        return this
    }, multiplyVector3: function (b) {
        var d = b.x, c = b.y, f = b.z, g = 1 / (this.n41 * d + this.n42 * c + this.n43 * f + this.n44);
        b.x = (this.n11 * d + this.n12 * c + this.n13 * f + this.n14) * g;
        b.y = (this.n21 * d + this.n22 * c + this.n23 *
            f + this.n24) * g;
        b.z = (this.n31 * d + this.n32 * c + this.n33 * f + this.n34) * g;
        return b
    }, multiplyVector4: function (b) {
        var d = b.x, c = b.y, f = b.z, g = b.w;
        b.x = this.n11 * d + this.n12 * c + this.n13 * f + this.n14 * g;
        b.y = this.n21 * d + this.n22 * c + this.n23 * f + this.n24 * g;
        b.z = this.n31 * d + this.n32 * c + this.n33 * f + this.n34 * g;
        b.w = this.n41 * d + this.n42 * c + this.n43 * f + this.n44 * g;
        return b
    }, rotateAxis: function (b) {
        var d = b.x, c = b.y, f = b.z;
        b.x = d * this.n11 + c * this.n12 + f * this.n13;
        b.y = d * this.n21 + c * this.n22 + f * this.n23;
        b.z = d * this.n31 + c * this.n32 + f * this.n33;
        b.normalize();
        return b
    }, crossVector: function (b) {
        var d = new THREE.Vector4;
        d.x = this.n11 * b.x + this.n12 * b.y + this.n13 * b.z + this.n14 * b.w;
        d.y = this.n21 * b.x + this.n22 * b.y + this.n23 * b.z + this.n24 * b.w;
        d.z = this.n31 * b.x + this.n32 * b.y + this.n33 * b.z + this.n34 * b.w;
        d.w = b.w ? this.n41 * b.x + this.n42 * b.y + this.n43 * b.z + this.n44 * b.w : 1;
        return d
    }, multiply: function (b, d) {
        var c = b.n11, f = b.n12, g = b.n13, h = b.n14, j = b.n21, k = b.n22, m = b.n23, o = b.n24, t = b.n31, u = b.n32, w = b.n33, p = b.n34, A = b.n41, I = b.n42, H = b.n43, C = b.n44, U = d.n11, D = d.n12, V = d.n13, O = d.n14, R = d.n21, la = d.n22,
            da = d.n23, oa = d.n24, $ = d.n31, na = d.n32, e = d.n33, xa = d.n34;
        this.n11 = c * U + f * R + g * $;
        this.n12 = c * D + f * la + g * na;
        this.n13 = c * V + f * da + g * e;
        this.n14 = c * O + f * oa + g * xa + h;
        this.n21 = j * U + k * R + m * $;
        this.n22 = j * D + k * la + m * na;
        this.n23 = j * V + k * da + m * e;
        this.n24 = j * O + k * oa + m * xa + o;
        this.n31 = t * U + u * R + w * $;
        this.n32 = t * D + u * la + w * na;
        this.n33 = t * V + u * da + w * e;
        this.n34 = t * O + u * oa + w * xa + p;
        this.n41 = A * U + I * R + H * $;
        this.n42 = A * D + I * la + H * na;
        this.n43 = A * V + I * da + H * e;
        this.n44 = A * O + I * oa + H * xa + C;
        return this
    }, multiplyToArray: function (b, d, c) {
        this.multiply(b, d);
        c[0] = this.n11;
        c[1] = this.n21;
        c[2] = this.n31;
        c[3] = this.n41;
        c[4] = this.n12;
        c[5] = this.n22;
        c[6] = this.n32;
        c[7] = this.n42;
        c[8] = this.n13;
        c[9] = this.n23;
        c[10] = this.n33;
        c[11] = this.n43;
        c[12] = this.n14;
        c[13] = this.n24;
        c[14] = this.n34;
        c[15] = this.n44;
        return this
    }, multiplySelf: function (b) {
        this.multiply(this, b);
        return this
    }, multiplyScalar: function (b) {
        this.n11 *= b;
        this.n12 *= b;
        this.n13 *= b;
        this.n14 *= b;
        this.n21 *= b;
        this.n22 *= b;
        this.n23 *= b;
        this.n24 *= b;
        this.n31 *= b;
        this.n32 *= b;
        this.n33 *= b;
        this.n34 *= b;
        this.n41 *= b;
        this.n42 *= b;
        this.n43 *= b;
        this.n44 *= b;
        return this
    },
    determinant: function () {
        var b = this.n11, d = this.n12, c = this.n13, f = this.n14, g = this.n21, h = this.n22, j = this.n23, k = this.n24, m = this.n31, o = this.n32, t = this.n33, u = this.n34, w = this.n41, p = this.n42, A = this.n43, I = this.n44;
        return f * j * o * w - c * k * o * w - f * h * t * w + d * k * t * w + c * h * u * w - d * j * u * w - f * j * m * p + c * k * m * p + f * g * t * p - b * k * t * p - c * g * u * p + b * j * u * p + f * h * m * A - d * k * m * A - f * g * o * A + b * k * o * A + d * g * u * A - b * h * u * A - c * h * m * I + d * j * m * I + c * g * o * I - b * j * o * I - d * g * t * I + b * h * t * I
    }, transpose: function () {
        var b;
        b = this.n21;
        this.n21 = this.n12;
        this.n12 = b;
        b = this.n31;
        this.n31 = this.n13;
        this.n13 =
            b;
        b = this.n32;
        this.n32 = this.n23;
        this.n23 = b;
        b = this.n41;
        this.n41 = this.n14;
        this.n14 = b;
        b = this.n42;
        this.n42 = this.n24;
        this.n24 = b;
        b = this.n43;
        this.n43 = this.n34;
        this.n43 = b;
        return this
    }, clone: function () {
        var b = new THREE.Matrix4;
        b.n11 = this.n11;
        b.n12 = this.n12;
        b.n13 = this.n13;
        b.n14 = this.n14;
        b.n21 = this.n21;
        b.n22 = this.n22;
        b.n23 = this.n23;
        b.n24 = this.n24;
        b.n31 = this.n31;
        b.n32 = this.n32;
        b.n33 = this.n33;
        b.n34 = this.n34;
        b.n41 = this.n41;
        b.n42 = this.n42;
        b.n43 = this.n43;
        b.n44 = this.n44;
        return b
    }, flatten: function () {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] = this.n44;
        return this.flat
    }, flattenToArray: function (b) {
        b[0] = this.n11;
        b[1] = this.n21;
        b[2] = this.n31;
        b[3] = this.n41;
        b[4] = this.n12;
        b[5] = this.n22;
        b[6] = this.n32;
        b[7] = this.n42;
        b[8] = this.n13;
        b[9] = this.n23;
        b[10] = this.n33;
        b[11] = this.n43;
        b[12] = this.n14;
        b[13] = this.n24;
        b[14] = this.n34;
        b[15] = this.n44;
        return b
    }, flattenToArrayOffset: function (b, d) {
        b[d] = this.n11;
        b[d + 1] = this.n21;
        b[d + 2] = this.n31;
        b[d + 3] = this.n41;
        b[d + 4] = this.n12;
        b[d + 5] = this.n22;
        b[d + 6] = this.n32;
        b[d + 7] = this.n42;
        b[d + 8] = this.n13;
        b[d + 9] = this.n23;
        b[d + 10] = this.n33;
        b[d + 11] = this.n43;
        b[d + 12] = this.n14;
        b[d + 13] = this.n24;
        b[d + 14] = this.n34;
        b[d + 15] = this.n44;
        return b
    }, setTranslation: function (b, d, c) {
        this.set(1, 0, 0, b, 0, 1, 0, d, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    setScale: function (b, d, c) {
        this.set(b, 0, 0, 0, 0, d, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    }, setRotationX: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(1, 0, 0, 0, 0, d, -b, 0, 0, b, d, 0, 0, 0, 0, 1);
        return this
    }, setRotationY: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(d, 0, b, 0, 0, 1, 0, 0, -b, 0, d, 0, 0, 0, 0, 1);
        return this
    }, setRotationZ: function (b) {
        var d = Math.cos(b);
        b = Math.sin(b);
        this.set(d, -b, 0, 0, b, d, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    }, setRotationAxis: function (b, d) {
        var c = Math.cos(d), f = Math.sin(d), g = 1 - c, h = b.x, j = b.y, k =
            b.z, m = g * h, o = g * j;
        this.set(m * h + c, m * j - f * k, m * k + f * j, 0, m * j + f * k, o * j + c, o * k - f * h, 0, m * k - f * j, o * k + f * h, g * k * k + c, 0, 0, 0, 0, 1);
        return this
    }, setPosition: function (b) {
        this.n14 = b.x;
        this.n24 = b.y;
        this.n34 = b.z;
        return this
    }, getPosition: function () {
        if (!this.position)this.position = new THREE.Vector3;
        this.position.set(this.n14, this.n24, this.n34);
        return this.position
    }, getColumnX: function () {
        if (!this.columnX)this.columnX = new THREE.Vector3;
        this.columnX.set(this.n11, this.n21, this.n31);
        return this.columnX
    }, getColumnY: function () {
        if (!this.columnY)this.columnY =
            new THREE.Vector3;
        this.columnY.set(this.n12, this.n22, this.n32);
        return this.columnY
    }, getColumnZ: function () {
        if (!this.columnZ)this.columnZ = new THREE.Vector3;
        this.columnZ.set(this.n13, this.n23, this.n33);
        return this.columnZ
    }, setRotationFromEuler: function (b) {
        var d = b.x, c = b.y, f = b.z;
        b = Math.cos(d);
        d = Math.sin(d);
        var g = Math.cos(c);
        c = Math.sin(c);
        var h = Math.cos(f);
        f = Math.sin(f);
        var j = b * c, k = d * c;
        this.n11 = g * h;
        this.n12 = -g * f;
        this.n13 = c;
        this.n21 = k * h + b * f;
        this.n22 = -k * f + b * h;
        this.n23 = -d * g;
        this.n31 = -j * h + d * f;
        this.n32 = j * f +
            d * h;
        this.n33 = b * g;
        return this
    }, setRotationFromQuaternion: function (b) {
        var d = b.x, c = b.y, f = b.z, g = b.w, h = d + d, j = c + c, k = f + f;
        b = d * h;
        var m = d * j;
        d *= k;
        var o = c * j;
        c *= k;
        f *= k;
        h *= g;
        j *= g;
        g *= k;
        this.n11 = 1 - (o + f);
        this.n12 = m - g;
        this.n13 = d + j;
        this.n21 = m + g;
        this.n22 = 1 - (b + f);
        this.n23 = c - h;
        this.n31 = d - j;
        this.n32 = c + h;
        this.n33 = 1 - (b + o);
        return this
    }, scale: function (b) {
        var d = b.x, c = b.y;
        b = b.z;
        this.n11 *= d;
        this.n12 *= c;
        this.n13 *= b;
        this.n21 *= d;
        this.n22 *= c;
        this.n23 *= b;
        this.n31 *= d;
        this.n32 *= c;
        this.n33 *= b;
        this.n41 *= d;
        this.n42 *= c;
        this.n43 *= b;
        return this
    },
    extractPosition: function (b) {
        this.n14 = b.n14;
        this.n24 = b.n24;
        this.n34 = b.n34
    }, extractRotation: function (b, d) {
        var c = 1 / d.x, f = 1 / d.y, g = 1 / d.z;
        this.n11 = b.n11 * c;
        this.n21 = b.n21 * c;
        this.n31 = b.n31 * c;
        this.n12 = b.n12 * f;
        this.n22 = b.n22 * f;
        this.n32 = b.n32 * f;
        this.n13 = b.n13 * g;
        this.n23 = b.n23 * g;
        this.n33 = b.n33 * g
    }
};
THREE.Matrix4.makeInvert = function (b, d) {
    var c = b.n11, f = b.n12, g = b.n13, h = b.n14, j = b.n21, k = b.n22, m = b.n23, o = b.n24, t = b.n31, u = b.n32, w = b.n33, p = b.n34, A = b.n41, I = b.n42, H = b.n43, C = b.n44;
    d === undefined && (d = new THREE.Matrix4);
    d.n11 = m * p * I - o * w * I + o * u * H - k * p * H - m * u * C + k * w * C;
    d.n12 = h * w * I - g * p * I - h * u * H + f * p * H + g * u * C - f * w * C;
    d.n13 = g * o * I - h * m * I + h * k * H - f * o * H - g * k * C + f * m * C;
    d.n14 = h * m * u - g * o * u - h * k * w + f * o * w + g * k * p - f * m * p;
    d.n21 = o * w * A - m * p * A - o * t * H + j * p * H + m * t * C - j * w * C;
    d.n22 = g * p * A - h * w * A + h * t * H - c * p * H - g * t * C + c * w * C;
    d.n23 = h * m * A - g * o * A - h * j * H + c * o * H + g * j * C - c * m * C;
    d.n24 = g * o * t - h * m * t + h * j * w - c * o * w - g * j * p + c * m * p;
    d.n31 = k * p * A - o * u * A + o * t * I - j * p * I - k * t * C + j * u * C;
    d.n32 = h * u * A - f * p * A - h * t * I + c * p * I + f * t * C - c * u * C;
    d.n33 = g * o * A - h * k * A + h * j * I - c * o * I - f * j * C + c * k * C;
    d.n34 = h * k * t - f * o * t - h * j * u + c * o * u + f * j * p - c * k * p;
    d.n41 = m * u * A - k * w * A - m * t * I + j * w * I + k * t * H - j * u * H;
    d.n42 = f * w * A - g * u * A + g * t * I - c * w * I - f * t * H + c * u * H;
    d.n43 = g * k * A - f * m * A - g * j * I + c * m * I + f * j * H - c * k * H;
    d.n44 = f * m * t - g * k * t + g * j * u - c * m * u - f * j * w + c * k * w;
    d.multiplyScalar(1 / b.determinant());
    return d
};
THREE.Matrix4.makeInvert3x3 = function (b) {
    var d = b.m33, c = d.m, f = b.n33 * b.n22 - b.n32 * b.n23, g = -b.n33 * b.n21 + b.n31 * b.n23, h = b.n32 * b.n21 - b.n31 * b.n22, j = -b.n33 * b.n12 + b.n32 * b.n13, k = b.n33 * b.n11 - b.n31 * b.n13, m = -b.n32 * b.n11 + b.n31 * b.n12, o = b.n23 * b.n12 - b.n22 * b.n13, t = -b.n23 * b.n11 + b.n21 * b.n13, u = b.n22 * b.n11 - b.n21 * b.n12;
    b = b.n11 * f + b.n21 * j + b.n31 * o;
    if (b == 0)throw"matrix not invertible";
    b = 1 / b;
    c[0] = b * f;
    c[1] = b * g;
    c[2] = b * h;
    c[3] = b * j;
    c[4] = b * k;
    c[5] = b * m;
    c[6] = b * o;
    c[7] = b * t;
    c[8] = b * u;
    return d
};
THREE.Matrix4.makeFrustum = function (b, d, c, f, g, h) {
    var j;
    j = new THREE.Matrix4;
    j.n11 = 2 * g / (d - b);
    j.n12 = 0;
    j.n13 = (d + b) / (d - b);
    j.n14 = 0;
    j.n21 = 0;
    j.n22 = 2 * g / (f - c);
    j.n23 = (f + c) / (f - c);
    j.n24 = 0;
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -(h + g) / (h - g);
    j.n34 = -2 * h * g / (h - g);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = -1;
    j.n44 = 0;
    return j
};
THREE.Matrix4.makePerspective = function (b, d, c, f) {
    var g;
    b = c * Math.tan(b * Math.PI / 360);
    g = -b;
    return THREE.Matrix4.makeFrustum(g * d, b * d, g, b, c, f)
};
THREE.Matrix4.makeOrtho = function (b, d, c, f, g, h) {
    var j, k, m, o;
    j = new THREE.Matrix4;
    k = d - b;
    m = c - f;
    o = h - g;
    j.n11 = 2 / k;
    j.n12 = 0;
    j.n13 = 0;
    j.n14 = -((d + b) / k);
    j.n21 = 0;
    j.n22 = 2 / m;
    j.n23 = 0;
    j.n24 = -((c + f) / m);
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -2 / o;
    j.n34 = -((h + g) / o);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = 0;
    j.n44 = 1;
    return j
};
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Object3D = function () {
    this.parent = undefined;
    this.children = [];
    this.up = new THREE.Vector3(0, 1, 0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.scale = new THREE.Vector3(1, 1, 1);
    this.dynamic = !1;
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixAutoUpdate = !0;
    this.matrixWorldNeedsUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale =
        1;
    this.visible = !0;
    this._vector = new THREE.Vector3;
    this.name = ""
};
THREE.Object3D.prototype = {
    translate: function (b, d) {
        this.matrix.rotateAxis(d);
        this.position.addSelf(d.multiplyScalar(b))
    }, translateX: function (b) {
        this.translate(b, this._vector.set(1, 0, 0))
    }, translateY: function (b) {
        this.translate(b, this._vector.set(0, 1, 0))
    }, translateZ: function (b) {
        this.translate(b, this._vector.set(0, 0, 1))
    }, lookAt: function (b) {
        this.matrix.lookAt(b, this.position, this.up);
        this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
    }, addChild: function (b) {
        if (this.children.indexOf(b) === -1) {
            b.parent !== undefined && b.parent.removeChild(b);
            b.parent = this;
            this.children.push(b);
            for (var d = this; d.parent !== undefined;)d = d.parent;
            d !== undefined && d instanceof THREE.Scene && d.addChildRecurse(b)
        }
    }, removeChild: function (b) {
        var d = this.children.indexOf(b);
        if (d !== -1) {
            b.parent = undefined;
            this.children.splice(d, 1)
        }
    }, getChildByName: function (b, d) {
        var c, f, g;
        c = 0;
        for (f = this.children.length; c < f; c++) {
            g = this.children[c];
            if (g.name === b)return g;
            if (d) {
                g = g.getChildByName(b, d);
                if (g !== undefined)return g
            }
        }
    }, updateMatrix: function () {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))
        }
        this.matrixWorldNeedsUpdate = !0
    }, update: function (b, d, c) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || d) {
            b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
            this.matrixWorldNeedsUpdate = !1;
            d = !0
        }
        b = 0;
        for (var f = this.children.length; b < f; b++)this.children[b].update(this.matrixWorld, d, c)
    }
};
THREE.Quaternion = function (b, d, c, f) {
    this.set(b || 0, d || 0, c || 0, f !== undefined ? f : 1)
};
THREE.Quaternion.prototype = {
    set: function (b, d, c, f) {
        this.x = b;
        this.y = d;
        this.z = c;
        this.w = f;
        return this
    }, copy: function (b) {
        this.x = b.x;
        this.y = b.y;
        this.z = b.z;
        this.w = b.w;
        return this
    }, setFromEuler: function (b) {
        var d = 0.5 * Math.PI / 360, c = b.x * d, f = b.y * d, g = b.z * d;
        b = Math.cos(f);
        f = Math.sin(f);
        d = Math.cos(-g);
        g = Math.sin(-g);
        var h = Math.cos(c);
        c = Math.sin(c);
        var j = b * d, k = f * g;
        this.w = j * h - k * c;
        this.x = j * c + k * h;
        this.y = f * d * h + b * g * c;
        this.z = b * g * h - f * d * c;
        return this
    }, setFromAxisAngle: function (b, d) {
        var c = d / 2, f = Math.sin(c);
        this.x = b.x * f;
        this.y =
            b.y * f;
        this.z = b.z * f;
        this.w = Math.cos(c);
        return this
    }, calculateW: function () {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    }, inverse: function () {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    }, length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    }, normalize: function () {
        var b = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (b == 0)this.w = this.z = this.y = this.x = 0; else {
            b = 1 / b;
            this.x *= b;
            this.y *= b;
            this.z *= b;
            this.w *= b
        }
        return this
    },
    multiplySelf: function (b) {
        var d = this.x, c = this.y, f = this.z, g = this.w, h = b.x, j = b.y, k = b.z;
        b = b.w;
        this.x = d * b + g * h + c * k - f * j;
        this.y = c * b + g * j + f * h - d * k;
        this.z = f * b + g * k + d * j - c * h;
        this.w = g * b - d * h - c * j - f * k;
        return this
    }, multiply: function (b, d) {
        this.x = b.x * d.w + b.y * d.z - b.z * d.y + b.w * d.x;
        this.y = -b.x * d.z + b.y * d.w + b.z * d.x + b.w * d.y;
        this.z = b.x * d.y - b.y * d.x + b.z * d.w + b.w * d.z;
        this.w = -b.x * d.x - b.y * d.y - b.z * d.z + b.w * d.w;
        return this
    }, multiplyVector3: function (b, d) {
        d || (d = b);
        var c = b.x, f = b.y, g = b.z, h = this.x, j = this.y, k = this.z, m = this.w, o = m * c + j * g - k * f, t =
            m * f + k * c - h * g, u = m * g + h * f - j * c;
        c = -h * c - j * f - k * g;
        d.x = o * m + c * -h + t * -k - u * -j;
        d.y = t * m + c * -j + u * -h - o * -k;
        d.z = u * m + c * -k + o * -j - t * -h;
        return d
    }
};
THREE.Quaternion.slerp = function (b, d, c, f) {
    var g = b.w * d.w + b.x * d.x + b.y * d.y + b.z * d.z;
    if (Math.abs(g) >= 1) {
        c.w = b.w;
        c.x = b.x;
        c.y = b.y;
        c.z = b.z;
        return c
    }
    var h = Math.acos(g), j = Math.sqrt(1 - g * g);
    if (Math.abs(j) < 0.001) {
        c.w = 0.5 * (b.w + d.w);
        c.x = 0.5 * (b.x + d.x);
        c.y = 0.5 * (b.y + d.y);
        c.z = 0.5 * (b.z + d.z);
        return c
    }
    g = Math.sin((1 - f) * h) / j;
    f = Math.sin(f * h) / j;
    c.w = b.w * g + d.w * f;
    c.x = b.x * g + d.x * f;
    c.y = b.y * g + d.y * f;
    c.z = b.z * g + d.z * f;
    return c
};
THREE.Vertex = function (b) {
    this.position = b || new THREE.Vector3
};
THREE.Face3 = function (b, d, c, f, g, h) {
    this.a = b;
    this.b = d;
    this.c = c;
    this.normal = f instanceof THREE.Vector3 ? f : new THREE.Vector3;
    this.vertexNormals = f instanceof Array ? f : [];
    this.color = g instanceof THREE.Color ? g : new THREE.Color;
    this.vertexColors = g instanceof Array ? g : [];
    this.vertexTangents = [];
    this.materials = h instanceof Array ? h : [h];
    this.centroid = new THREE.Vector3
};
THREE.Face4 = function (b, d, c, f, g, h, j) {
    this.a = b;
    this.b = d;
    this.c = c;
    this.d = f;
    this.normal = g instanceof THREE.Vector3 ? g : new THREE.Vector3;
    this.vertexNormals = g instanceof Array ? g : [];
    this.color = h instanceof THREE.Color ? h : new THREE.Color;
    this.vertexColors = h instanceof Array ? h : [];
    this.vertexTangents = [];
    this.materials = j instanceof Array ? j : [j];
    this.centroid = new THREE.Vector3
};
THREE.UV = function (b, d) {
    this.set(b || 0, d || 0)
};
THREE.UV.prototype = {
    set: function (b, d) {
        this.u = b;
        this.v = d;
        return this
    }, copy: function (b) {
        this.set(b.u, b.v);
        return this
    }
};
THREE.Geometry = function () {
    this.id = "Geometry" + THREE.GeometryIdCounter++;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.edges = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.morphColors = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1
};
THREE.Geometry.prototype = {
    computeCentroids: function () {
        var b, d, c;
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            c = this.faces[b];
            c.centroid.set(0, 0, 0);
            if (c instanceof THREE.Face3) {
                c.centroid.addSelf(this.vertices[c.a].position);
                c.centroid.addSelf(this.vertices[c.b].position);
                c.centroid.addSelf(this.vertices[c.c].position);
                c.centroid.divideScalar(3)
            } else if (c instanceof THREE.Face4) {
                c.centroid.addSelf(this.vertices[c.a].position);
                c.centroid.addSelf(this.vertices[c.b].position);
                c.centroid.addSelf(this.vertices[c.c].position);
                c.centroid.addSelf(this.vertices[c.d].position);
                c.centroid.divideScalar(4)
            }
        }
    }, computeFaceNormals: function (b) {
        var d, c, f, g, h, j, k = new THREE.Vector3, m = new THREE.Vector3;
        f = 0;
        for (g = this.faces.length; f < g; f++) {
            h = this.faces[f];
            if (b && h.vertexNormals.length) {
                k.set(0, 0, 0);
                d = 0;
                for (c = h.vertexNormals.length; d < c; d++)k.addSelf(h.vertexNormals[d]);
                k.divideScalar(3)
            } else {
                d = this.vertices[h.a];
                c = this.vertices[h.b];
                j = this.vertices[h.c];
                k.sub(j.position, c.position);
                m.sub(d.position, c.position);
                k.crossSelf(m)
            }
            k.isZero() ||
            k.normalize();
            h.normal.copy(k)
        }
    }, computeVertexNormals: function () {
        var b, d, c, f;
        if (this.__tmpVertices == undefined) {
            f = this.__tmpVertices = Array(this.vertices.length);
            b = 0;
            for (d = this.vertices.length; b < d; b++)f[b] = new THREE.Vector3;
            b = 0;
            for (d = this.faces.length; b < d; b++) {
                c = this.faces[b];
                if (c instanceof THREE.Face3)c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]; else if (c instanceof THREE.Face4)c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
            }
        } else {
            f =
                this.__tmpVertices;
            b = 0;
            for (d = this.vertices.length; b < d; b++)f[b].set(0, 0, 0)
        }
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            c = this.faces[b];
            if (c instanceof THREE.Face3) {
                f[c.a].addSelf(c.normal);
                f[c.b].addSelf(c.normal);
                f[c.c].addSelf(c.normal)
            } else if (c instanceof THREE.Face4) {
                f[c.a].addSelf(c.normal);
                f[c.b].addSelf(c.normal);
                f[c.c].addSelf(c.normal);
                f[c.d].addSelf(c.normal)
            }
        }
        b = 0;
        for (d = this.vertices.length; b < d; b++)f[b].normalize();
        b = 0;
        for (d = this.faces.length; b < d; b++) {
            c = this.faces[b];
            if (c instanceof THREE.Face3) {
                c.vertexNormals[0].copy(f[c.a]);
                c.vertexNormals[1].copy(f[c.b]);
                c.vertexNormals[2].copy(f[c.c])
            } else if (c instanceof THREE.Face4) {
                c.vertexNormals[0].copy(f[c.a]);
                c.vertexNormals[1].copy(f[c.b]);
                c.vertexNormals[2].copy(f[c.c]);
                c.vertexNormals[3].copy(f[c.d])
            }
        }
    }, computeTangents: function () {
        function b(ra, ea, za, ma, ta, pa, ja) {
            k = ra.vertices[ea].position;
            m = ra.vertices[za].position;
            o = ra.vertices[ma].position;
            t = j[ta];
            u = j[pa];
            w = j[ja];
            p = m.x - k.x;
            A = o.x - k.x;
            I = m.y - k.y;
            H = o.y - k.y;
            C = m.z - k.z;
            U = o.z - k.z;
            D = u.u - t.u;
            V = w.u - t.u;
            O = u.v - t.v;
            R = w.v - t.v;
            la = 1 / (D *
                R - V * O);
            na.set((R * p - O * A) * la, (R * I - O * H) * la, (R * C - O * U) * la);
            e.set((D * A - V * p) * la, (D * H - V * I) * la, (D * U - V * C) * la);
            oa[ea].addSelf(na);
            oa[za].addSelf(na);
            oa[ma].addSelf(na);
            $[ea].addSelf(e);
            $[za].addSelf(e);
            $[ma].addSelf(e)
        }

        var d, c, f, g, h, j, k, m, o, t, u, w, p, A, I, H, C, U, D, V, O, R, la, da, oa = [], $ = [], na = new THREE.Vector3, e = new THREE.Vector3, xa = new THREE.Vector3, sa = new THREE.Vector3, Da = new THREE.Vector3;
        d = 0;
        for (c = this.vertices.length; d < c; d++) {
            oa[d] = new THREE.Vector3;
            $[d] = new THREE.Vector3
        }
        d = 0;
        for (c = this.faces.length; d < c; d++) {
            h =
                this.faces[d];
            j = this.faceVertexUvs[0][d];
            if (h instanceof THREE.Face3)b(this, h.a, h.b, h.c, 0, 1, 2); else if (h instanceof THREE.Face4) {
                b(this, h.a, h.b, h.c, 0, 1, 2);
                b(this, h.a, h.b, h.d, 0, 1, 3)
            }
        }
        var fa = ["a", "b", "c", "d"];
        d = 0;
        for (c = this.faces.length; d < c; d++) {
            h = this.faces[d];
            for (f = 0; f < h.vertexNormals.length; f++) {
                Da.copy(h.vertexNormals[f]);
                g = h[fa[f]];
                da = oa[g];
                xa.copy(da);
                xa.subSelf(Da.multiplyScalar(Da.dot(da))).normalize();
                sa.cross(h.vertexNormals[f], da);
                g = sa.dot($[g]);
                g = g < 0 ? -1 : 1;
                h.vertexTangents[f] = new THREE.Vector4(xa.x,
                    xa.y, xa.z, g)
            }
        }
        this.hasTangents = !0
    }, computeBoundingBox: function () {
        var b;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                x: [this.vertices[0].position.x, this.vertices[0].position.x],
                y: [this.vertices[0].position.y, this.vertices[0].position.y],
                z: [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var d = 1, c = this.vertices.length; d < c; d++) {
                b = this.vertices[d];
                if (b.position.x < this.boundingBox.x[0])this.boundingBox.x[0] = b.position.x; else if (b.position.x > this.boundingBox.x[1])this.boundingBox.x[1] = b.position.x;
                if (b.position.y < this.boundingBox.y[0])this.boundingBox.y[0] = b.position.y; else if (b.position.y > this.boundingBox.y[1])this.boundingBox.y[1] = b.position.y;
                if (b.position.z < this.boundingBox.z[0])this.boundingBox.z[0] = b.position.z; else if (b.position.z > this.boundingBox.z[1])this.boundingBox.z[1] = b.position.z
            }
        }
    }, computeBoundingSphere: function () {
        for (var b = this.boundingSphere === null ? 0 : this.boundingSphere.radius, d = 0, c = this.vertices.length; d < c; d++)b = Math.max(b, this.vertices[d].position.length());
        this.boundingSphere =
        {radius: b}
    }, computeEdgeFaces: function () {
        function b(m, o) {
            return Math.min(m, o) + "_" + Math.max(m, o)
        }

        function d(m, o, t) {
            if (m[o] === undefined) {
                m[o] = {set: {}, array: []};
                m[o].set[t] = 1;
                m[o].array.push(t)
            } else if (m[o].set[t] === undefined) {
                m[o].set[t] = 1;
                m[o].array.push(t)
            }
        }

        var c, f, g, h, j, k = {};
        c = 0;
        for (f = this.faces.length; c < f; c++) {
            j = this.faces[c];
            if (j instanceof THREE.Face3) {
                g = b(j.a, j.b);
                d(k, g, c);
                g = b(j.b, j.c);
                d(k, g, c);
                g = b(j.a, j.c);
                d(k, g, c)
            } else if (j instanceof THREE.Face4) {
                g = b(j.b, j.d);
                d(k, g, c);
                g = b(j.a, j.b);
                d(k, g, c);
                g = b(j.a, j.d);
                d(k, g, c);
                g = b(j.b, j.c);
                d(k, g, c);
                g = b(j.c, j.d);
                d(k, g, c)
            }
        }
        c = 0;
        for (f = this.edges.length; c < f; c++) {
            j = this.edges[c];
            g = j.vertexIndices[0];
            h = j.vertexIndices[1];
            j.faceIndices = k[b(g, h)].array;
            for (g = 0; g < j.faceIndices.length; g++) {
                h = j.faceIndices[g];
                j.faces.push(this.faces[h])
            }
        }
    }
};
THREE.GeometryIdCounter = 0;
THREE.Spline = function (b) {
    function d(p, A, I, H, C, U, D) {
        p = (I - p) * 0.5;
        H = (H - A) * 0.5;
        return (2 * (A - I) + p + H) * D + (-3 * (A - I) - 2 * p - H) * U + p * C + A
    }

    this.points = b;
    var c = [], f = {x: 0, y: 0, z: 0}, g, h, j, k, m, o, t, u, w;
    this.initFromArray = function (p) {
        this.points = [];
        for (var A = 0; A < p.length; A++)this.points[A] = {x: p[A][0], y: p[A][1], z: p[A][2]}
    };
    this.getPoint = function (p) {
        g = (this.points.length - 1) * p;
        h = Math.floor(g);
        j = g - h;
        c[0] = h == 0 ? h : h - 1;
        c[1] = h;
        c[2] = h > this.points.length - 2 ? h : h + 1;
        c[3] = h > this.points.length - 3 ? h : h + 2;
        o = this.points[c[0]];
        t = this.points[c[1]];
        u = this.points[c[2]];
        w = this.points[c[3]];
        k = j * j;
        m = j * k;
        f.x = d(o.x, t.x, u.x, w.x, j, k, m);
        f.y = d(o.y, t.y, u.y, w.y, j, k, m);
        f.z = d(o.z, t.z, u.z, w.z, j, k, m);
        return f
    };
    this.getControlPointsArray = function () {
        var p, A, I = this.points.length, H = [];
        for (p = 0; p < I; p++) {
            A = this.points[p];
            H[p] = [A.x, A.y, A.z]
        }
        return H
    };
    this.getLength = function (p) {
        var A, I, H = A = A = 0, C = new THREE.Vector3, U = new THREE.Vector3, D = [], V = 0;
        D[0] = 0;
        p || (p = 100);
        I = this.points.length * p;
        C.copy(this.points[0]);
        for (p = 1; p < I; p++) {
            A = p / I;
            position = this.getPoint(A);
            U.copy(position);
            V += U.distanceTo(C);
            C.copy(position);
            A *= this.points.length - 1;
            A = Math.floor(A);
            if (A != H) {
                D[A] = V;
                H = A
            }
        }
        D[D.length] = V;
        return {chunks: D, total: V}
    };
    this.reparametrizeByArcLength = function (p) {
        var A, I, H, C, U, D, V = [], O = new THREE.Vector3, R = this.getLength();
        V.push(O.copy(this.points[0]).clone());
        for (A = 1; A < this.points.length; A++) {
            I = R.chunks[A] - R.chunks[A - 1];
            D = Math.ceil(p * I / R.total);
            C = (A - 1) / (this.points.length - 1);
            U = A / (this.points.length - 1);
            for (I = 1; I < D - 1; I++) {
                H = C + I * (1 / D) * (U - C);
                position = this.getPoint(H);
                V.push(O.copy(position).clone())
            }
            V.push(O.copy(this.points[A]).clone())
        }
        this.points =
            V
    }
};
THREE.Edge = function (b, d, c, f) {
    this.vertices = [b, d];
    this.vertexIndices = [c, f];
    this.faces = [];
    this.faceIndices = []
};
THREE.Camera = function (b, d, c, f, g) {
    THREE.Object3D.call(this);
    this.fov = b || 50;
    this.aspect = d || 1;
    this.near = c || 0.1;
    this.far = f || 2E3;
    this.target = g || new THREE.Object3D;
    this.useTarget = !0;
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = null;
    this.updateProjectionMatrix()
};
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function (b, d) {
    this.matrix.rotateAxis(d);
    this.position.addSelf(d.multiplyScalar(b));
    this.target.position.addSelf(d.multiplyScalar(b))
};
THREE.Camera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
};
THREE.Camera.prototype.update = function (b, d, c) {
    if (this.useTarget) {
        this.matrix.lookAt(this.position, this.target.position, this.up);
        this.matrix.setPosition(this.position);
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
        d = !0
    } else {
        this.matrixAutoUpdate && this.updateMatrix();
        if (d || this.matrixWorldNeedsUpdate) {
            b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = !1;
            d = !0;
            THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse)
        }
    }
    for (b = 0; b < this.children.length; b++)this.children[b].update(this.matrixWorld, d, c)
};
THREE.Light = function (b) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(b)
};
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function (b) {
    THREE.Light.call(this, b)
};
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function (b, d, c, f) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3(0, 1, 0);
    this.intensity = d || 1;
    this.distance = c || 0;
    this.castShadow = f !== undefined ? f : !1
};
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function (b, d, c) {
    THREE.Light.call(this, b);
    this.position = new THREE.Vector3;
    this.intensity = d || 1;
    this.distance = c || 0
};
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.LensFlare = function (b, d, c, f) {
    THREE.Object3D.call(this);
    this.positionScreen = new THREE.Vector3;
    this.lensFlares = [];
    this.customUpdateCallback = undefined;
    b !== undefined && this.add(b, d, c, f)
};
THREE.LensFlare.prototype = new THREE.Object3D;
THREE.LensFlare.prototype.constructor = THREE.LensFlare;
THREE.LensFlare.prototype.supr = THREE.Object3D.prototype;
THREE.LensFlare.prototype.add = function (b, d, c, f) {
    d === undefined && (d = -1);
    c === undefined && (c = 0);
    if (f === undefined)f = THREE.BillboardBlending;
    c = Math.min(c, Math.max(0, c));
    this.lensFlares.push({
        texture: b,
        size: d,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: 1,
        blending: f
    })
};
THREE.LensFlare.prototype.updateLensFlares = function () {
    var b, d = this.lensFlares.length, c, f = -this.positionScreen.x * 2, g = -this.positionScreen.y * 2;
    for (b = 0; b < d; b++) {
        c = this.lensFlares[b];
        c.x = this.positionScreen.x + f * c.distance;
        c.y = this.positionScreen.y + g * c.distance;
        c.wantedRotation = c.x * Math.PI * 0.25;
        c.rotation += (c.wantedRotation - c.rotation) * 0.25
    }
};
THREE.Material = function (b) {
    this.id = THREE.MaterialCounter.value++;
    b = b || {};
    this.opacity = b.opacity !== undefined ? b.opacity : 1;
    this.transparent = b.transparent !== undefined ? b.transparent : !1;
    this.blending = b.blending !== undefined ? b.blending : THREE.NormalBlending;
    this.depthTest = b.depthTest !== undefined ? b.depthTest : !0
};
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.MultiplyBlending = 3;
THREE.AdditiveAlphaBlending = 4;
THREE.MaterialCounter = {value: 0};
THREE.CubeReflectionMapping = function () {
};
THREE.CubeRefractionMapping = function () {
};
THREE.LatitudeReflectionMapping = function () {
};
THREE.LatitudeRefractionMapping = function () {
};
THREE.SphericalReflectionMapping = function () {
};
THREE.SphericalRefractionMapping = function () {
};
THREE.UVMapping = function () {
};
THREE.LineBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.linewidth = b.linewidth !== undefined ? b.linewidth : 1;
    this.linecap = b.linecap !== undefined ? b.linecap : "round";
    this.linejoin = b.linejoin !== undefined ? b.linejoin : "round";
    this.vertexColors = b.vertexColors ? b.vertexColors : !1
};
THREE.LineBasicMaterial.prototype = new THREE.Material;
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial;
THREE.MeshBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading =
        b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ?
        b.morphTargets : !1
};
THREE.MeshBasicMaterial.prototype = new THREE.Material;
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial;
THREE.MeshLambertMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading =
        b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ?
        b.morphTargets : !1
};
THREE.MeshLambertMaterial.prototype = new THREE.Material;
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial;
THREE.MeshPhongMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.ambient = b.ambient !== undefined ? new THREE.Color(b.ambient) : new THREE.Color(328965);
    this.specular = b.specular !== undefined ? new THREE.Color(b.specular) : new THREE.Color(1118481);
    this.shininess = b.shininess !== undefined ? b.shininess : 30;
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ?
        b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio : 0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
    this.wireframeLinejoin =
        b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1
};
THREE.MeshPhongMaterial.prototype = new THREE.Material;
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial;
THREE.MeshDepthMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1
};
THREE.MeshDepthMaterial.prototype = new THREE.Material;
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial;
THREE.MeshNormalMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.shading = b.shading ? b.shading : THREE.FlatShading;
    this.wireframe = b.wireframe ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth ? b.wireframeLinewidth : 1
};
THREE.MeshNormalMaterial.prototype = new THREE.Material;
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial;
THREE.MeshFaceMaterial = function () {
};
THREE.MeshShaderMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.fragmentShader = b.fragmentShader !== undefined ? b.fragmentShader : "void main() {}";
    this.vertexShader = b.vertexShader !== undefined ? b.vertexShader : "void main() {}";
    this.uniforms = b.uniforms !== undefined ? b.uniforms : {};
    this.attributes = b.attributes;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth :
        1;
    this.fog = b.fog !== undefined ? b.fog : !1;
    this.lights = b.lights !== undefined ? b.lights : !1;
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !== undefined ? b.morphTargets : !1
};
THREE.MeshShaderMaterial.prototype = new THREE.Material;
THREE.MeshShaderMaterial.prototype.constructor = THREE.MeshShaderMaterial;
THREE.ShadowVolumeDynamicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.lightMap = b.lightMap !== undefined ? b.lightMap : null;
    this.envMap = b.envMap !== undefined ? b.envMap : null;
    this.combine = b.combine !== undefined ? b.combine : THREE.MultiplyOperation;
    this.reflectivity = b.reflectivity !== undefined ? b.reflectivity : 1;
    this.refractionRatio = b.refractionRatio !== undefined ? b.refractionRatio :
        0.98;
    this.shading = b.shading !== undefined ? b.shading : THREE.SmoothShading;
    this.wireframe = b.wireframe !== undefined ? b.wireframe : !1;
    this.wireframeLinewidth = b.wireframeLinewidth !== undefined ? b.wireframeLinewidth : 1;
    this.wireframeLinecap = b.wireframeLinecap !== undefined ? b.wireframeLinecap : "round";
    this.wireframeLinejoin = b.wireframeLinejoin !== undefined ? b.wireframeLinejoin : "round";
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1;
    this.skinning = b.skinning !== undefined ? b.skinning : !1;
    this.morphTargets = b.morphTargets !==
    undefined ? b.morphTargets : !1
};
THREE.ShadowVolumeDynamicMaterial.prototype = new THREE.Material;
THREE.ShadowVolumeDynamicMaterial.prototype.constructor = THREE.ShadowVolumeDynamicMaterial;
THREE.ParticleBasicMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.map = b.map !== undefined ? b.map : null;
    this.size = b.size !== undefined ? b.size : 1;
    this.sizeAttenuation = b.sizeAttenuation !== undefined ? b.sizeAttenuation : !0;
    this.vertexColors = b.vertexColors !== undefined ? b.vertexColors : !1
};
THREE.ParticleBasicMaterial.prototype = new THREE.Material;
THREE.ParticleBasicMaterial.prototype.constructor = THREE.ParticleBasicMaterial;
THREE.ParticleCanvasMaterial = function (b) {
    THREE.Material.call(this, b);
    b = b || {};
    this.color = b.color !== undefined ? new THREE.Color(b.color) : new THREE.Color(16777215);
    this.program = b.program !== undefined ? b.program : function () {
    }
};
THREE.ParticleCanvasMaterial.prototype = new THREE.Material;
THREE.ParticleCanvasMaterial.prototype.constructor = THREE.ParticleCanvasMaterial;
THREE.ParticleDOMMaterial = function (b) {
    THREE.Material.call(this);
    this.domElement = b
};
THREE.Texture = function (b, d, c, f, g, h) {
    this.image = b;
    this.mapping = d !== undefined ? d : new THREE.UVMapping;
    this.wrapS = c !== undefined ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = f !== undefined ? f : THREE.ClampToEdgeWrapping;
    this.magFilter = g !== undefined ? g : THREE.LinearFilter;
    this.minFilter = h !== undefined ? h : THREE.LinearMipMapLinearFilter;
    this.needsUpdate = !1
};
THREE.Texture.prototype = {
    clone: function () {
        return new THREE.Texture(this.image, this.mapping, this.wrapS, this.wrapT, this.magFilter, this.minFilter)
    }
};
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.Particle = function (b) {
    THREE.Object3D.call(this);
    this.materials = b instanceof Array ? b : [b]
};
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.sortParticles = !1
};
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function (b, d, c) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.type = c != undefined ? c : THREE.LineStrip
};
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d && d.length ? d : [d];
    this.flipSided = !1;
    this.doubleSided = !1;
    this.overdraw = !1;
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = b.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var c = 0; c < this.geometry.morphTargets.length; c++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
            }
        }
    }
};
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function (b) {
    if (this.morphTargetDictionary[b] !== undefined)return this.morphTargetDictionary[b];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + b + " does not exist. Returning 0.");
    return 0
};
THREE.Bone = function (b) {
    THREE.Object3D.call(this);
    this.skin = b;
    this.skinMatrix = new THREE.Matrix4;
    this.hasNoneBoneChildren = !1
};
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function (b, d, c) {
    this.matrixAutoUpdate && (d |= this.updateMatrix());
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.skinMatrix.multiply(b, this.matrix) : this.skinMatrix.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0
    }
    var f, g = this.children.length;
    if (this.hasNoneBoneChildren) {
        this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
        for (f = 0; f < g; f++) {
            b = this.children[f];
            b instanceof THREE.Bone ? b.update(this.skinMatrix, d, c) : b.update(this.matrixWorld, !0, c)
        }
    } else for (f = 0; f < g; f++)this.children[f].update(this.skinMatrix,
        d, c)
};
THREE.Bone.prototype.addChild = function (b) {
    if (this.children.indexOf(b) === -1) {
        b.parent !== undefined && b.parent.removeChild(b);
        b.parent = this;
        this.children.push(b);
        if (!(b instanceof THREE.Bone))this.hasNoneBoneChildren = !0
    }
};
THREE.SkinnedMesh = function (b, d) {
    THREE.Mesh.call(this, b, d);
    this.identityMatrix = new THREE.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var c, f, g, h, j, k;
    if (this.geometry.bones !== undefined) {
        for (c = 0; c < this.geometry.bones.length; c++) {
            g = this.geometry.bones[c];
            h = g.pos;
            j = g.rotq;
            k = g.scl;
            f = this.addBone();
            f.name = g.name;
            f.position.set(h[0], h[1], h[2]);
            f.quaternion.set(j[0], j[1], j[2], j[3]);
            f.useQuaternion = !0;
            k !== undefined ? f.scale.set(k[0], k[1], k[2]) : f.scale.set(1, 1, 1)
        }
        for (c = 0; c < this.bones.length; c++) {
            g = this.geometry.bones[c];
            f = this.bones[c];
            g.parent === -1 ? this.addChild(f) : this.bones[g.parent].addChild(f)
        }
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose()
    }
};
THREE.SkinnedMesh.prototype = new THREE.Mesh;
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function (b, d, c) {
    if (this.visible) {
        this.matrixAutoUpdate && (d |= this.updateMatrix());
        if (d || this.matrixWorldNeedsUpdate) {
            b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = !1;
            d = !0
        }
        var f, g = this.children.length;
        for (f = 0; f < g; f++) {
            b = this.children[f];
            b instanceof THREE.Bone ? b.update(this.identityMatrix, !1, c) : b.update(this.matrixWorld, d, c)
        }
        c = this.bones.length;
        ba = this.bones;
        bm = this.boneMatrices;
        for (d = 0; d < c; d++)ba[d].skinMatrix.flattenToArrayOffset(bm,
            d * 16)
    }
};
THREE.SkinnedMesh.prototype.addBone = function (b) {
    b === undefined && (b = new THREE.Bone(this));
    this.bones.push(b);
    return b
};
THREE.SkinnedMesh.prototype.pose = function () {
    this.update(undefined, !0);
    for (var b, d = [], c = 0; c < this.bones.length; c++) {
        b = this.bones[c];
        d.push(THREE.Matrix4.makeInvert(b.skinMatrix));
        b.skinMatrix.flattenToArrayOffset(this.boneMatrices, c * 16)
    }
    if (this.geometry.skinVerticesA === undefined) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        var f;
        for (b = 0; b < this.geometry.skinIndices.length; b++) {
            c = this.geometry.vertices[b].position;
            var g = this.geometry.skinIndices[b].x, h = this.geometry.skinIndices[b].y;
            f = new THREE.Vector3(c.x, c.y, c.z);
            this.geometry.skinVerticesA.push(d[g].multiplyVector3(f));
            f = new THREE.Vector3(c.x, c.y, c.z);
            this.geometry.skinVerticesB.push(d[h].multiplyVector3(f));
            if (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y !== 1) {
                c = (1 - (this.geometry.skinWeights[b].x + this.geometry.skinWeights[b].y)) * 0.5;
                this.geometry.skinWeights[b].x += c;
                this.geometry.skinWeights[b].y += c
            }
        }
    }
};
THREE.Ribbon = function (b, d) {
    THREE.Object3D.call(this);
    this.geometry = b;
    this.materials = d instanceof Array ? d : [d];
    this.flipSided = !1;
    this.doubleSided = !1
};
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.Sound = function (b, d, c, f) {
    THREE.Object3D.call(this);
    this.isLoaded = !1;
    this.isAddedToDOM = !1;
    this.isPlaying = !1;
    this.duration = -1;
    this.radius = d !== undefined ? Math.abs(d) : 100;
    this.volume = Math.min(1, Math.max(0, c !== undefined ? c : 1));
    this.domElement = document.createElement("audio");
    this.domElement.volume = 0;
    this.domElement.pan = 0;
    this.domElement.loop = f !== undefined ? f : !0;
    this.sources = b instanceof Array ? b : [b];
    var g;
    c = this.sources.length;
    for (b = 0; b < c; b++) {
        d = this.sources[b];
        d.toLowerCase();
        if (d.indexOf(".mp3") !== -1)g =
            "audio/mpeg"; else if (d.indexOf(".ogg") !== -1)g = "audio/ogg"; else d.indexOf(".wav") !== -1 && (g = "audio/wav");
        if (this.domElement.canPlayType(g)) {
            g = document.createElement("source");
            g.src = this.sources[b];
            this.domElement.THREESound = this;
            this.domElement.appendChild(g);
            this.domElement.addEventListener("canplay", this.onLoad, !0);
            this.domElement.load();
            break
        }
    }
};
THREE.Sound.prototype = new THREE.Object3D;
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function () {
    var b = this.THREESound;
    if (!b.isLoaded) {
        this.removeEventListener("canplay", this.onLoad, !0);
        b.isLoaded = !0;
        b.duration = this.duration;
        b.isPlaying && b.play()
    }
};
THREE.Sound.prototype.addToDOM = function (b) {
    this.isAddedToDOM = !0;
    b.appendChild(this.domElement)
};
THREE.Sound.prototype.play = function (b) {
    this.isPlaying = !0;
    if (this.isLoaded) {
        this.domElement.play();
        if (b)this.domElement.currentTime = b % this.duration
    }
};
THREE.Sound.prototype.pause = function () {
    this.isPlaying = !1;
    this.domElement.pause()
};
THREE.Sound.prototype.stop = function () {
    this.isPlaying = !1;
    this.domElement.pause();
    this.domElement.currentTime = 0
};
THREE.Sound.prototype.calculateVolumeAndPan = function (b) {
    b = b.length();
    this.domElement.volume = b <= this.radius ? this.volume * (1 - b / this.radius) : 0
};
THREE.Sound.prototype.update = function (b, d, c) {
    if (this.matrixAutoUpdate) {
        this.matrix.setPosition(this.position);
        d = !0
    }
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0
    }
    var f = this.children.length;
    for (b = 0; b < f; b++)this.children[b].update(this.matrixWorld, d, c)
};
THREE.LOD = function () {
    THREE.Object3D.call(this);
    this.LODs = []
};
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.add = function (b, d) {
    d === undefined && (d = 0);
    d = Math.abs(d);
    for (var c = 0; c < this.LODs.length; c++)if (d < this.LODs[c].visibleAtDistance)break;
    this.LODs.splice(c, 0, {visibleAtDistance: d, object3D: b});
    this.addChild(b)
};
THREE.LOD.prototype.update = function (b, d, c) {
    this.matrixAutoUpdate && (d |= this.updateMatrix());
    if (d || this.matrixWorldNeedsUpdate) {
        b ? this.matrixWorld.multiply(b, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        d = !0
    }
    if (this.LODs.length > 1) {
        b = c.matrixWorldInverse;
        b = -(b.n31 * this.position.x + b.n32 * this.position.y + b.n33 * this.position.z + b.n34);
        this.LODs[0].object3D.visible = !0;
        for (var f = 1; f < this.LODs.length; f++)if (b >= this.LODs[f].visibleAtDistance) {
            this.LODs[f - 1].object3D.visible = !1;
            this.LODs[f].object3D.visible = !0
        } else break;
        for (; f < this.LODs.length; f++)this.LODs[f].object3D.visible = !1
    }
    for (b = 0; b < this.children.length; b++)this.children[b].update(this.matrixWorld, d, c)
};
THREE.ShadowVolume = function (b, d) {
    if (b instanceof THREE.Mesh) {
        THREE.Mesh.call(this, b.geometry, d ? [new THREE.ShadowVolumeDynamicMaterial] : [new THREE.ShadowVolumeDynamicMaterial]);
        b.addChild(this)
    } else THREE.Mesh.call(this, b, d ? [new THREE.ShadowVolumeDynamicMaterial] : [new THREE.ShadowVolumeDynamicMaterial]);
    this.calculateShadowVolumeGeometry()
};
THREE.ShadowVolume.prototype = new THREE.Mesh;
THREE.ShadowVolume.prototype.constructor = THREE.ShadowVolume;
THREE.ShadowVolume.prototype.supr = THREE.Mesh.prototype;
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometry = function () {
    if (this.geometry.edges && this.geometry.edges.length) {
        var b, d, c, f, g, h, j, k, m, o, t, u, w, p, A = new THREE.Geometry;
        A.vertices = this.geometry.vertices;
        f = A.faces = this.geometry.faces;
        var I = A.egdes = this.geometry.edges, H = A.edgeFaces = [];
        g = 0;
        var C = [];
        b = 0;
        for (d = f.length; b < d; b++) {
            c = f[b];
            C.push(g);
            g += c instanceof THREE.Face3 ? 3 : 4;
            c.vertexNormals[0] = c.normal;
            c.vertexNormals[1] = c.normal;
            c.vertexNormals[2] = c.normal;
            if (c instanceof THREE.Face4)c.vertexNormals[3] =
                c.normal
        }
        b = 0;
        for (d = I.length; b < d; b++) {
            k = I[b];
            c = k.faces[0];
            f = k.faces[1];
            g = k.faceIndices[0];
            h = k.faceIndices[1];
            j = k.vertexIndices[0];
            k = k.vertexIndices[1];
            if (c.a === j) {
                m = "a";
                t = C[g] + 0
            } else if (c.b === j) {
                m = "b";
                t = C[g] + 1
            } else if (c.c === j) {
                m = "c";
                t = C[g] + 2
            } else if (c.d === j) {
                m = "d";
                t = C[g] + 3
            }
            if (c.a === k) {
                m += "a";
                u = C[g] + 0
            } else if (c.b === k) {
                m += "b";
                u = C[g] + 1
            } else if (c.c === k) {
                m += "c";
                u = C[g] + 2
            } else if (c.d === k) {
                m += "d";
                u = C[g] + 3
            }
            if (f.a === j) {
                o = "a";
                w = C[h] + 0
            } else if (f.b === j) {
                o = "b";
                w = C[h] + 1
            } else if (f.c === j) {
                o = "c";
                w = C[h] + 2
            } else if (f.d ===
                j) {
                o = "d";
                w = C[h] + 3
            }
            if (f.a === k) {
                o += "a";
                p = C[h] + 0
            } else if (f.b === k) {
                o += "b";
                p = C[h] + 1
            } else if (f.c === k) {
                o += "c";
                p = C[h] + 2
            } else if (f.d === k) {
                o += "d";
                p = C[h] + 3
            }
            if (m === "ac" || m === "ad" || m === "ca" || m === "da") {
                if (t > u) {
                    c = t;
                    t = u;
                    u = c
                }
            } else if (t < u) {
                c = t;
                t = u;
                u = c
            }
            if (o === "ac" || o === "ad" || o === "ca" || o === "da") {
                if (w > p) {
                    c = w;
                    w = p;
                    p = c
                }
            } else if (w < p) {
                c = w;
                w = p;
                p = c
            }
            c = new THREE.Face4(t, u, w, p);
            c.normal.set(1, 0, 0);
            H.push(c)
        }
        this.geometry = A
    } else this.calculateShadowVolumeGeometryWithoutEdgeInfo(this.geometry)
};
THREE.ShadowVolume.prototype.calculateShadowVolumeGeometryWithoutEdgeInfo = function (b) {
    this.geometry = new THREE.Geometry;
    this.geometry.boundingSphere = b.boundingSphere;
    this.geometry.edgeFaces = [];
    var d = this.geometry.vertices, c = this.geometry.faces, f = this.geometry.edgeFaces, g = b.faces;
    b = b.vertices;
    var h = g.length, j, k, m, o, t, u = ["a", "b", "c", "d"];
    for (m = 0; m < h; m++) {
        k = d.length;
        j = g[m];
        if (j instanceof THREE.Face4) {
            o = 4;
            k = new THREE.Face4(k, k + 1, k + 2, k + 3)
        } else {
            o = 3;
            k = new THREE.Face3(k, k + 1, k + 2)
        }
        k.normal.copy(j.normal);
        c.push(k);
        for (k = 0; k < o; k++) {
            t = b[j[u[k]]];
            d.push(new THREE.Vertex(t.position.clone()))
        }
    }
    for (h = 0; h < g.length - 1; h++) {
        b = c[h];
        for (j = h + 1; j < g.length; j++) {
            k = c[j];
            k = this.facesShareEdge(d, b, k);
            if (k !== undefined) {
                k = new THREE.Face4(k.indices[0], k.indices[3], k.indices[2], k.indices[1]);
                k.normal.set(1, 0, 0);
                f.push(k)
            }
        }
    }
};
THREE.ShadowVolume.prototype.facesShareEdge = function (b, d, c) {
    var f, g, h, j, k, m, o, t, u, w, p, A, I, H = 0, C = ["a", "b", "c", "d"];
    f = d instanceof THREE.Face4 ? 4 : 3;
    g = c instanceof THREE.Face4 ? 4 : 3;
    for (A = 0; A < f; A++) {
        h = d[C[A]];
        k = b[h];
        for (I = 0; I < g; I++) {
            j = c[C[I]];
            m = b[j];
            if (Math.abs(k.position.x - m.position.x) < 1.0E-4 && Math.abs(k.position.y - m.position.y) < 1.0E-4 && Math.abs(k.position.z - m.position.z) < 1.0E-4) {
                H++;
                if (H === 1) {
                    o = k;
                    t = m;
                    u = h;
                    w = j;
                    p = C[A]
                }
                if (H === 2) {
                    p += C[A];
                    return p === "ad" || p === "ac" ? {
                        faces: [d, c], vertices: [o, t, m, k], indices: [u,
                            w, j, h], vertexTypes: [1, 2, 2, 1], extrudable: !0
                    } : {
                        faces: [d, c],
                        vertices: [o, k, m, t],
                        indices: [u, h, j, w],
                        vertexTypes: [1, 1, 2, 2],
                        extrudable: !0
                    }
                }
            }
        }
    }
};
THREE.Sprite = function (b) {
    THREE.Object3D.call(this);
    if (b.material !== undefined) {
        this.material = b.material;
        this.map = undefined;
        this.blending = material.blending
    } else if (b.map !== undefined) {
        this.map = b.map instanceof THREE.Texture ? b.map : ImageUtils.loadTexture(b.map);
        this.material = undefined;
        this.blending = b.blending !== undefined ? b.blending : THREE.NormalBlending
    }
    this.useScreenCoordinates = b.useScreenCoordinates !== undefined ? b.useScreenCoordinates : !0;
    this.mergeWith3D = b.mergeWith3D !== undefined ? b.mergeWith3D : !this.useScreenCoordinates;
    this.affectedByDistance = b.affectedByDistance !== undefined ? b.affectedByDistance : !this.useScreenCoordinates;
    this.alignment = b.alignment instanceof THREE.Vector2 ? b.alignment : THREE.SpriteAlignment.center;
    this.rotation3d = this.rotation;
    this.rotation = 0;
    this.opacity = 1;
    this.uvOffset = new THREE.Vector2(0, 0);
    this.uvScale = new THREE.Vector2(1, 1)
};
THREE.Sprite.prototype = new THREE.Object3D;
THREE.Sprite.prototype.constructor = THREE.Sprite;
THREE.Sprite.prototype.supr = THREE.Object3D.prototype;
THREE.Sprite.prototype.updateMatrix = function () {
    this.matrix.setPosition(this.position);
    this.rotation3d.set(0, 0, this.rotation);
    this.matrix.setRotationFromEuler(this.rotation3d);
    if (this.scale.x !== 1 || this.scale.y !== 1) {
        this.matrix.scale(this.scale);
        this.boundRadiusScale = Math.max(this.scale.x, this.scale.y)
    }
    this.matrixWorldNeedsUpdate = !0
};
THREE.SpriteAlignment = {};
THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1);
THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1);
THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1);
THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0);
THREE.SpriteAlignment.center = new THREE.Vector2(0, 0);
THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0);
THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1);
THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1);
THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1);
THREE.Scene = function () {
    THREE.Object3D.call(this);
    this.matrixAutoUpdate = !1;
    this.collisions = this.fog = null;
    this.objects = [];
    this.lights = [];
    this.sounds = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
};
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function (b) {
    this.supr.addChild.call(this, b);
    this.addChildRecurse(b)
};
THREE.Scene.prototype.addChildRecurse = function (b) {
    if (b instanceof THREE.Light)this.lights.indexOf(b) === -1 && this.lights.push(b); else if (b instanceof THREE.Sound)this.sounds.indexOf(b) === -1 && this.sounds.push(b); else if (!(b instanceof THREE.Camera || b instanceof THREE.Bone) && this.objects.indexOf(b) === -1) {
        this.objects.push(b);
        this.__objectsAdded.push(b)
    }
    for (var d = 0; d < b.children.length; d++)this.addChildRecurse(b.children[d])
};
THREE.Scene.prototype.removeChild = function (b) {
    this.supr.removeChild.call(this, b);
    this.removeChildRecurse(b)
};
THREE.Scene.prototype.removeChildRecurse = function (b) {
    if (b instanceof THREE.Light) {
        var d = this.lights.indexOf(b);
        d !== -1 && this.lights.splice(d, 1)
    } else if (b instanceof THREE.Sound) {
        d = this.sounds.indexOf(b);
        d !== -1 && this.sounds.splice(d, 1)
    } else if (!(b instanceof THREE.Camera)) {
        d = this.objects.indexOf(b);
        if (d !== -1) {
            this.objects.splice(d, 1);
            this.__objectsRemoved.push(b)
        }
    }
    for (d = 0; d < b.children.length; d++)this.removeChildRecurse(b.children[d])
};
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Fog = function (b, d, c) {
    this.color = new THREE.Color(b);
    this.near = d || 1;
    this.far = c || 1E3
};
THREE.FogExp2 = function (b, d) {
    this.color = new THREE.Color(b);
    this.density = d !== undefined ? d : 2.5E-4
};
THREE.Projector = function () {
    function b() {
        var na = m[k] = m[k] || new THREE.RenderableVertex;
        k++;
        return na
    }

    function d(na, e) {
        return e.z - na.z
    }

    function c(na, e) {
        var xa = 0, sa = 1, Da = na.z + na.w, fa = e.z + e.w, ra = -na.z + na.w, ea = -e.z + e.w;
        if (Da >= 0 && fa >= 0 && ra >= 0 && ea >= 0)return !0; else if (Da < 0 && fa < 0 || ra < 0 && ea < 0)return !1; else {
            if (Da < 0)xa = Math.max(xa, Da / (Da - fa)); else fa < 0 && (sa = Math.min(sa, Da / (Da - fa)));
            if (ra < 0)xa = Math.max(xa, ra / (ra - ea)); else ea < 0 && (sa = Math.min(sa, ra / (ra - ea)));
            if (sa < xa)return !1; else {
                na.lerpSelf(e, xa);
                e.lerpSelf(na,
                    1 - sa);
                return !0
            }
        }
    }

    var f, g, h = [], j, k, m = [], o, t, u = [], w, p = [], A, I, H = [], C, U, D = [], V = new THREE.Vector4, O = new THREE.Vector4, R = new THREE.Matrix4, la = new THREE.Matrix4, da = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], oa = new THREE.Vector4, $ = new THREE.Vector4;
    this.projectVector = function (na, e) {
        R.multiply(e.projectionMatrix, e.matrixWorldInverse);
        R.multiplyVector3(na);
        return na
    };
    this.unprojectVector = function (na, e) {
        R.multiply(e.matrixWorld, THREE.Matrix4.makeInvert(e.projectionMatrix));
        R.multiplyVector3(na);
        return na
    };
    this.projectObjects = function (na, e, xa) {
        e = [];
        var sa, Da, fa;
        g = 0;
        Da = na.objects;
        na = 0;
        for (sa = Da.length; na < sa; na++) {
            fa = Da[na];
            var ra;
            if (!(ra = !fa.visible))if (ra = fa instanceof THREE.Mesh) {
                a:{
                    ra = void 0;
                    for (var ea = fa.matrixWorld, za = -fa.geometry.boundingSphere.radius * Math.max(fa.scale.x, Math.max(fa.scale.y, fa.scale.z)), ma = 0; ma < 6; ma++) {
                        ra = da[ma].x * ea.n14 + da[ma].y * ea.n24 + da[ma].z * ea.n34 + da[ma].w;
                        if (ra <= za) {
                            ra = !1;
                            break a
                        }
                    }
                    ra = !0
                }
                ra = !ra
            }
            if (!ra) {
                ra = h[g] = h[g] || new THREE.RenderableObject;
                g++;
                f = ra;
                V.copy(fa.position);
                R.multiplyVector3(V);
                f.object = fa;
                f.z = V.z;
                e.push(f)
            }
        }
        xa && e.sort(d);
        return e
    };
    this.projectScene = function (na, e, xa) {
        var sa = [], Da = e.near, fa = e.far, ra, ea, za, ma, ta, pa, ja, Fa, Aa, ga, ua, Ja, Ra, Wa, N, Z, S;
        U = I = w = t = 0;
        e.matrixAutoUpdate && e.update(undefined, !0);
        na.update(undefined, !1, e);
        R.multiply(e.projectionMatrix, e.matrixWorldInverse);
        da[0].set(R.n41 - R.n11, R.n42 - R.n12, R.n43 - R.n13, R.n44 - R.n14);
        da[1].set(R.n41 + R.n11, R.n42 + R.n12, R.n43 + R.n13, R.n44 + R.n14);
        da[2].set(R.n41 + R.n21, R.n42 + R.n22,
            R.n43 + R.n23, R.n44 + R.n24);
        da[3].set(R.n41 - R.n21, R.n42 - R.n22, R.n43 - R.n23, R.n44 - R.n24);
        da[4].set(R.n41 - R.n31, R.n42 - R.n32, R.n43 - R.n33, R.n44 - R.n34);
        da[5].set(R.n41 + R.n31, R.n42 + R.n32, R.n43 + R.n33, R.n44 + R.n34);
        for (ra = 0; ra < 6; ra++) {
            Aa = da[ra];
            Aa.divideScalar(Math.sqrt(Aa.x * Aa.x + Aa.y * Aa.y + Aa.z * Aa.z))
        }
        Aa = this.projectObjects(na, e, !0);
        na = 0;
        for (ra = Aa.length; na < ra; na++) {
            ga = Aa[na].object;
            if (ga.visible) {
                ua = ga.matrixWorld;
                Ja = ga.matrixRotationWorld;
                Ra = ga.materials;
                Wa = ga.overdraw;
                k = 0;
                if (ga instanceof THREE.Mesh) {
                    N = ga.geometry;
                    ma = N.vertices;
                    Z = N.faces;
                    N = N.faceVertexUvs;
                    ea = 0;
                    for (za = ma.length; ea < za; ea++) {
                        j = b();
                        j.positionWorld.copy(ma[ea].position);
                        ua.multiplyVector3(j.positionWorld);
                        j.positionScreen.copy(j.positionWorld);
                        R.multiplyVector4(j.positionScreen);
                        j.positionScreen.x /= j.positionScreen.w;
                        j.positionScreen.y /= j.positionScreen.w;
                        j.visible = j.positionScreen.z > Da && j.positionScreen.z < fa
                    }
                    ma = 0;
                    for (ea = Z.length; ma < ea; ma++) {
                        za = Z[ma];
                        if (za instanceof THREE.Face3) {
                            ta = m[za.a];
                            pa = m[za.b];
                            ja = m[za.c];
                            if (ta.visible && pa.visible && ja.visible &&
                                (ga.doubleSided || ga.flipSided != (ja.positionScreen.x - ta.positionScreen.x) * (pa.positionScreen.y - ta.positionScreen.y) - (ja.positionScreen.y - ta.positionScreen.y) * (pa.positionScreen.x - ta.positionScreen.x) < 0)) {
                                Fa = u[t] = u[t] || new THREE.RenderableFace3;
                                t++;
                                o = Fa;
                                o.v1.copy(ta);
                                o.v2.copy(pa);
                                o.v3.copy(ja)
                            } else continue
                        } else if (za instanceof THREE.Face4) {
                            ta = m[za.a];
                            pa = m[za.b];
                            ja = m[za.c];
                            Fa = m[za.d];
                            if (ta.visible && pa.visible && ja.visible && Fa.visible && (ga.doubleSided || ga.flipSided != ((Fa.positionScreen.x - ta.positionScreen.x) *
                                (pa.positionScreen.y - ta.positionScreen.y) - (Fa.positionScreen.y - ta.positionScreen.y) * (pa.positionScreen.x - ta.positionScreen.x) < 0 || (pa.positionScreen.x - ja.positionScreen.x) * (Fa.positionScreen.y - ja.positionScreen.y) - (pa.positionScreen.y - ja.positionScreen.y) * (Fa.positionScreen.x - ja.positionScreen.x) < 0))) {
                                S = p[w] = p[w] || new THREE.RenderableFace4;
                                w++;
                                o = S;
                                o.v1.copy(ta);
                                o.v2.copy(pa);
                                o.v3.copy(ja);
                                o.v4.copy(Fa)
                            } else continue
                        }
                        o.normalWorld.copy(za.normal);
                        Ja.multiplyVector3(o.normalWorld);
                        o.centroidWorld.copy(za.centroid);
                        ua.multiplyVector3(o.centroidWorld);
                        o.centroidScreen.copy(o.centroidWorld);
                        R.multiplyVector3(o.centroidScreen);
                        ja = za.vertexNormals;
                        ta = 0;
                        for (pa = ja.length; ta < pa; ta++) {
                            Fa = o.vertexNormalsWorld[ta];
                            Fa.copy(ja[ta]);
                            Ja.multiplyVector3(Fa)
                        }
                        ta = 0;
                        for (pa = N.length; ta < pa; ta++)if (S = N[ta][ma]) {
                            ja = 0;
                            for (Fa = S.length; ja < Fa; ja++)o.uvs[ta][ja] = S[ja]
                        }
                        o.meshMaterials = Ra;
                        o.faceMaterials = za.materials;
                        o.overdraw = Wa;
                        o.z = o.centroidScreen.z;
                        sa.push(o)
                    }
                } else if (ga instanceof THREE.Line) {
                    la.multiply(R, ua);
                    ma = ga.geometry.vertices;
                    ta = b();
                    ta.positionScreen.copy(ma[0].position);
                    la.multiplyVector4(ta.positionScreen);
                    ea = 1;
                    for (za = ma.length; ea < za; ea++) {
                        ta = b();
                        ta.positionScreen.copy(ma[ea].position);
                        la.multiplyVector4(ta.positionScreen);
                        pa = m[k - 2];
                        oa.copy(ta.positionScreen);
                        $.copy(pa.positionScreen);
                        if (c(oa, $)) {
                            oa.multiplyScalar(1 / oa.w);
                            $.multiplyScalar(1 / $.w);
                            ua = H[I] = H[I] || new THREE.RenderableLine;
                            I++;
                            A = ua;
                            A.v1.positionScreen.copy(oa);
                            A.v2.positionScreen.copy($);
                            A.z = Math.max(oa.z, $.z);
                            A.materials = ga.materials;
                            sa.push(A)
                        }
                    }
                } else if (ga instanceof
                    THREE.Particle) {
                    O.set(ga.matrixWorld.n14, ga.matrixWorld.n24, ga.matrixWorld.n34, 1);
                    R.multiplyVector4(O);
                    O.z /= O.w;
                    if (O.z > 0 && O.z < 1) {
                        ua = D[U] = D[U] || new THREE.RenderableParticle;
                        U++;
                        C = ua;
                        C.x = O.x / O.w;
                        C.y = O.y / O.w;
                        C.z = O.z;
                        C.rotation = ga.rotation.z;
                        C.scale.x = ga.scale.x * Math.abs(C.x - (O.x + e.projectionMatrix.n11) / (O.w + e.projectionMatrix.n14));
                        C.scale.y = ga.scale.y * Math.abs(C.y - (O.y + e.projectionMatrix.n22) / (O.w + e.projectionMatrix.n24));
                        C.materials = ga.materials;
                        sa.push(C)
                    }
                }
            }
        }
        xa && sa.sort(d);
        return sa
    }
};
THREE.DOMRenderer = function () {
    THREE.Renderer.call(this);
    var b = null, d = new THREE.Projector, c, f, g, h;
    this.domElement = document.createElement("div");
    this.setSize = function (j, k) {
        c = j;
        f = k;
        g = c / 2;
        h = f / 2
    };
    this.render = function (j, k) {
        var m, o, t, u, w, p, A, I;
        b = d.projectScene(j, k);
        m = 0;
        for (o = b.length; m < o; m++) {
            w = b[m];
            if (w instanceof THREE.RenderableParticle) {
                A = w.x * g + g;
                I = w.y * h + h;
                t = 0;
                for (u = w.material.length; t < u; t++) {
                    p = w.material[t];
                    if (p instanceof THREE.ParticleDOMMaterial) {
                        p = p.domElement;
                        p.style.left = A + "px";
                        p.style.top = I + "px"
                    }
                }
            }
        }
    }
};
THREE.CanvasRenderer = function () {
    function b(Ka) {
        if (H != Ka)p.globalAlpha = H = Ka
    }

    function d(Ka) {
        if (C != Ka) {
            switch (Ka) {
                case THREE.NormalBlending:
                    p.globalCompositeOperation = "source-over";
                    break;
                case THREE.AdditiveBlending:
                    p.globalCompositeOperation = "lighter";
                    break;
                case THREE.SubtractiveBlending:
                    p.globalCompositeOperation = "darker"
            }
            C = Ka
        }
    }

    function c(Ka) {
        if (U != Ka.hex) {
            U = Ka.hex;
            p.strokeStyle = "#" + g(U.toString(16))
        }
    }

    function f(Ka) {
        if (D != Ka.hex) {
            D = Ka.hex;
            p.fillStyle = "#" + g(D.toString(16))
        }
    }

    function g(Ka) {
        for (; Ka.length <
               6;)Ka = "0" + Ka;
        return Ka
    }

    var h = this, j = null, k = new THREE.Projector, m = document.createElement("canvas"), o, t, u, w, p = m.getContext("2d"), A = new THREE.Color(0), I = 0, H = 1, C = 0, U = null, D = null, V = null, O = null, R = null, la, da, oa, $, na = new THREE.RenderableVertex, e = new THREE.RenderableVertex, xa, sa, Da, fa, ra, ea, za, ma, ta, pa, ja, Fa, Aa = new THREE.Color(0), ga = new THREE.Color(0), ua = new THREE.Color(0), Ja = new THREE.Color(0), Ra = new THREE.Color(0), Wa, N, Z, S, T, Ma, db, n, E, y, v = new THREE.Rectangle, z = new THREE.Rectangle, K = new THREE.Rectangle, L =
        !1, G = new THREE.Color, P = new THREE.Color, Y = new THREE.Color, B = new THREE.Color, J = new THREE.Vector3, X, ka, ha, Ha, Ba, La, Xa = 16;
    X = document.createElement("canvas");
    X.width = X.height = 2;
    ka = X.getContext("2d");
    ka.fillStyle = "rgba(0,0,0,1)";
    ka.fillRect(0, 0, 2, 2);
    ha = ka.getImageData(0, 0, 2, 2);
    Ha = ha.data;
    Ba = document.createElement("canvas");
    Ba.width = Ba.height = Xa;
    La = Ba.getContext("2d");
    La.translate(-Xa / 2, -Xa / 2);
    La.scale(Xa, Xa);
    Xa--;
    this.domElement = m;
    this.autoClear = !0;
    this.sortObjects = !0;
    this.sortElements = !0;
    this.data = {
        vertices: 0,
        faces: 0
    };
    this.setSize = function (Ka, ya) {
        o = Ka;
        t = ya;
        u = o / 2;
        w = t / 2;
        m.width = o;
        m.height = t;
        v.set(-u, -w, u, w);
        H = 1;
        C = 0;
        R = O = V = D = U = null
    };
    this.setClearColor = function (Ka, ya) {
        A = Ka;
        I = ya
    };
    this.setClearColorHex = function (Ka, ya) {
        A.setHex(Ka);
        I = ya
    };
    this.clear = function () {
        p.setTransform(1, 0, 0, -1, u, w);
        if (!z.isEmpty()) {
            z.inflate(1);
            z.minSelf(v);
            if (A.hex == 0 && I == 0)p.clearRect(z.getX(), z.getY(), z.getWidth(), z.getHeight()); else {
                d(THREE.NormalBlending);
                b(1);
                p.fillStyle = "rgba(" + Math.floor(A.r * 255) + "," + Math.floor(A.g * 255) + "," + Math.floor(A.b *
                        255) + "," + I + ")";
                p.fillRect(z.getX(), z.getY(), z.getWidth(), z.getHeight())
            }
            z.empty()
        }
    };
    this.render = function (Ka, ya) {
        function Ga(Q) {
            var qa, ia, aa, va = Q.lights;
            P.setRGB(0, 0, 0);
            Y.setRGB(0, 0, 0);
            B.setRGB(0, 0, 0);
            Q = 0;
            for (qa = va.length; Q < qa; Q++) {
                ia = va[Q];
                aa = ia.color;
                if (ia instanceof THREE.AmbientLight) {
                    P.r += aa.r;
                    P.g += aa.g;
                    P.b += aa.b
                } else if (ia instanceof THREE.DirectionalLight) {
                    Y.r += aa.r;
                    Y.g += aa.g;
                    Y.b += aa.b
                } else if (ia instanceof THREE.PointLight) {
                    B.r += aa.r;
                    B.g += aa.g;
                    B.b += aa.b
                }
            }
        }

        function Ea(Q, qa, ia, aa) {
            var va, wa,
                Ca, W, Ia = Q.lights;
            Q = 0;
            for (va = Ia.length; Q < va; Q++) {
                wa = Ia[Q];
                Ca = wa.color;
                if (wa instanceof THREE.DirectionalLight) {
                    W = ia.dot(wa.position);
                    if (!(W <= 0)) {
                        W *= wa.intensity;
                        aa.r += Ca.r * W;
                        aa.g += Ca.g * W;
                        aa.b += Ca.b * W
                    }
                } else if (wa instanceof THREE.PointLight) {
                    W = ia.dot(J.sub(wa.position, qa).normalize());
                    if (!(W <= 0)) {
                        W *= wa.distance == 0 ? 1 : 1 - Math.min(qa.distanceTo(wa.position) / wa.distance, 1);
                        if (W != 0) {
                            W *= wa.intensity;
                            aa.r += Ca.r * W;
                            aa.g += Ca.g * W;
                            aa.b += Ca.b * W
                        }
                    }
                }
            }
        }

        function Ua(Q, qa, ia) {
            b(ia.opacity);
            d(ia.blending);
            var aa, va, wa, Ca,
                W, Ia;
            if (ia instanceof THREE.ParticleBasicMaterial) {
                if (ia.map) {
                    Ca = ia.map.image;
                    W = Ca.width >> 1;
                    Ia = Ca.height >> 1;
                    ia = qa.scale.x * u;
                    wa = qa.scale.y * w;
                    aa = ia * W;
                    va = wa * Ia;
                    K.set(Q.x - aa, Q.y - va, Q.x + aa, Q.y + va);
                    if (v.instersects(K)) {
                        p.save();
                        p.translate(Q.x, Q.y);
                        p.rotate(-qa.rotation);
                        p.scale(ia, -wa);
                        p.translate(-W, -Ia);
                        p.drawImage(Ca, 0, 0);
                        p.restore()
                    }
                }
            } else if (ia instanceof THREE.ParticleCanvasMaterial) {
                aa = qa.scale.x * u;
                va = qa.scale.y * w;
                K.set(Q.x - aa, Q.y - va, Q.x + aa, Q.y + va);
                if (v.instersects(K)) {
                    c(ia.color);
                    f(ia.color);
                    p.save();
                    p.translate(Q.x, Q.y);
                    p.rotate(-qa.rotation);
                    p.scale(aa, va);
                    ia.program(p);
                    p.restore()
                }
            }
        }

        function F(Q, qa, ia, aa) {
            b(aa.opacity);
            d(aa.blending);
            p.beginPath();
            p.moveTo(Q.positionScreen.x, Q.positionScreen.y);
            p.lineTo(qa.positionScreen.x, qa.positionScreen.y);
            p.closePath();
            if (aa instanceof THREE.LineBasicMaterial) {
                Q = aa.linewidth;
                if (V != Q)p.lineWidth = V = Q;
                Q = aa.linecap;
                if (O != Q)p.lineCap = O = Q;
                Q = aa.linejoin;
                if (R != Q)p.lineJoin = R = Q;
                c(aa.color);
                p.stroke();
                K.inflate(aa.linewidth * 2)
            }
        }

        function ca(Q, qa, ia, aa, va, wa, Ca, W,
                    Ia) {
            h.data.vertices += 3;
            h.data.faces++;
            b(W.opacity);
            d(W.blending);
            xa = Q.positionScreen.x;
            sa = Q.positionScreen.y;
            Da = qa.positionScreen.x;
            fa = qa.positionScreen.y;
            ra = ia.positionScreen.x;
            ea = ia.positionScreen.y;
            bb(xa, sa, Da, fa, ra, ea);
            if (W instanceof THREE.MeshBasicMaterial)if (W.map) {
                if (W.map.mapping instanceof THREE.UVMapping) {
                    S = Ca.uvs[0];
                    eb(xa, sa, Da, fa, ra, ea, W.map.image, S[aa].u, S[aa].v, S[va].u, S[va].v, S[wa].u, S[wa].v)
                }
            } else if (W.envMap) {
                if (W.envMap.mapping instanceof THREE.SphericalReflectionMapping) {
                    Q = ya.matrixWorldInverse;
                    J.copy(Ca.vertexNormalsWorld[0]);
                    T = (J.x * Q.n11 + J.y * Q.n12 + J.z * Q.n13) * 0.5 + 0.5;
                    Ma = -(J.x * Q.n21 + J.y * Q.n22 + J.z * Q.n23) * 0.5 + 0.5;
                    J.copy(Ca.vertexNormalsWorld[1]);
                    db = (J.x * Q.n11 + J.y * Q.n12 + J.z * Q.n13) * 0.5 + 0.5;
                    n = -(J.x * Q.n21 + J.y * Q.n22 + J.z * Q.n23) * 0.5 + 0.5;
                    J.copy(Ca.vertexNormalsWorld[2]);
                    E = (J.x * Q.n11 + J.y * Q.n12 + J.z * Q.n13) * 0.5 + 0.5;
                    y = -(J.x * Q.n21 + J.y * Q.n22 + J.z * Q.n23) * 0.5 + 0.5;
                    eb(xa, sa, Da, fa, ra, ea, W.envMap.image, T, Ma, db, n, E, y)
                }
            } else W.wireframe ? Pa(W.color, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(W.color);
            else if (W instanceof THREE.MeshLambertMaterial) {
                if (W.map && !W.wireframe) {
                    if (W.map.mapping instanceof THREE.UVMapping) {
                        S = Ca.uvs[0];
                        eb(xa, sa, Da, fa, ra, ea, W.map.image, S[aa].u, S[aa].v, S[va].u, S[va].v, S[wa].u, S[wa].v)
                    }
                    d(THREE.SubtractiveBlending)
                }
                if (L)if (!W.wireframe && W.shading == THREE.SmoothShading && Ca.vertexNormalsWorld.length == 3) {
                    ga.r = ua.r = Ja.r = P.r;
                    ga.g = ua.g = Ja.g = P.g;
                    ga.b = ua.b = Ja.b = P.b;
                    Ea(Ia, Ca.v1.positionWorld, Ca.vertexNormalsWorld[0], ga);
                    Ea(Ia, Ca.v2.positionWorld, Ca.vertexNormalsWorld[1], ua);
                    Ea(Ia, Ca.v3.positionWorld,
                        Ca.vertexNormalsWorld[2], Ja);
                    Ra.r = (ua.r + Ja.r) * 0.5;
                    Ra.g = (ua.g + Ja.g) * 0.5;
                    Ra.b = (ua.b + Ja.b) * 0.5;
                    Z = jb(ga, ua, Ja, Ra);
                    eb(xa, sa, Da, fa, ra, ea, Z, 0, 0, 1, 0, 0, 1)
                } else {
                    G.r = P.r;
                    G.g = P.g;
                    G.b = P.b;
                    Ea(Ia, Ca.centroidWorld, Ca.normalWorld, G);
                    Aa.r = Math.max(0, Math.min(W.color.r * G.r, 1));
                    Aa.g = Math.max(0, Math.min(W.color.g * G.g, 1));
                    Aa.b = Math.max(0, Math.min(W.color.b * G.b, 1));
                    Aa.updateHex();
                    W.wireframe ? Pa(Aa, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(Aa)
                } else W.wireframe ? Pa(W.color, W.wireframeLinewidth, W.wireframeLinecap,
                    W.wireframeLinejoin) : Sa(W.color)
            } else if (W instanceof THREE.MeshDepthMaterial) {
                Wa = ya.near;
                N = ya.far;
                ga.r = ga.g = ga.b = 1 - Za(Q.positionScreen.z, Wa, N);
                ua.r = ua.g = ua.b = 1 - Za(qa.positionScreen.z, Wa, N);
                Ja.r = Ja.g = Ja.b = 1 - Za(ia.positionScreen.z, Wa, N);
                Ra.r = (ua.r + Ja.r) * 0.5;
                Ra.g = (ua.g + Ja.g) * 0.5;
                Ra.b = (ua.b + Ja.b) * 0.5;
                Z = jb(ga, ua, Ja, Ra);
                eb(xa, sa, Da, fa, ra, ea, Z, 0, 0, 1, 0, 0, 1)
            } else if (W instanceof THREE.MeshNormalMaterial) {
                Aa.r = ab(Ca.normalWorld.x);
                Aa.g = ab(Ca.normalWorld.y);
                Aa.b = ab(Ca.normalWorld.z);
                Aa.updateHex();
                W.wireframe ?
                    Pa(Aa, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(Aa)
            }
        }

        function x(Q, qa, ia, aa, va, wa, Ca, W, Ia) {
            h.data.vertices += 4;
            h.data.faces++;
            b(W.opacity);
            d(W.blending);
            if (W.map || W.envMap) {
                ca(Q, qa, aa, 0, 1, 3, Ca, W, Ia);
                ca(va, ia, wa, 1, 2, 3, Ca, W, Ia)
            } else {
                xa = Q.positionScreen.x;
                sa = Q.positionScreen.y;
                Da = qa.positionScreen.x;
                fa = qa.positionScreen.y;
                ra = ia.positionScreen.x;
                ea = ia.positionScreen.y;
                za = aa.positionScreen.x;
                ma = aa.positionScreen.y;
                ta = va.positionScreen.x;
                pa = va.positionScreen.y;
                ja = wa.positionScreen.x;
                Fa = wa.positionScreen.y;
                if (W instanceof THREE.MeshBasicMaterial) {
                    hb(xa, sa, Da, fa, ra, ea, za, ma);
                    W.wireframe ? Pa(W.color, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(W.color)
                } else if (W instanceof THREE.MeshLambertMaterial)if (L)if (!W.wireframe && W.shading == THREE.SmoothShading && Ca.vertexNormalsWorld.length == 4) {
                    ga.r = ua.r = Ja.r = Ra.r = P.r;
                    ga.g = ua.g = Ja.g = Ra.g = P.g;
                    ga.b = ua.b = Ja.b = Ra.b = P.b;
                    Ea(Ia, Ca.v1.positionWorld, Ca.vertexNormalsWorld[0], ga);
                    Ea(Ia, Ca.v2.positionWorld, Ca.vertexNormalsWorld[1], ua);
                    Ea(Ia, Ca.v4.positionWorld, Ca.vertexNormalsWorld[3], Ja);
                    Ea(Ia, Ca.v3.positionWorld, Ca.vertexNormalsWorld[2], Ra);
                    Z = jb(ga, ua, Ja, Ra);
                    bb(xa, sa, Da, fa, za, ma);
                    eb(xa, sa, Da, fa, za, ma, Z, 0, 0, 1, 0, 0, 1);
                    bb(ta, pa, ra, ea, ja, Fa);
                    eb(ta, pa, ra, ea, ja, Fa, Z, 1, 0, 1, 1, 0, 1)
                } else {
                    G.r = P.r;
                    G.g = P.g;
                    G.b = P.b;
                    Ea(Ia, Ca.centroidWorld, Ca.normalWorld, G);
                    Aa.r = Math.max(0, Math.min(W.color.r * G.r, 1));
                    Aa.g = Math.max(0, Math.min(W.color.g * G.g, 1));
                    Aa.b = Math.max(0, Math.min(W.color.b * G.b, 1));
                    Aa.updateHex();
                    hb(xa, sa, Da, fa, ra, ea, za, ma);
                    W.wireframe ? Pa(Aa,
                        W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(Aa)
                } else {
                    hb(xa, sa, Da, fa, ra, ea, za, ma);
                    W.wireframe ? Pa(W.color, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(W.color)
                } else if (W instanceof THREE.MeshNormalMaterial) {
                    Aa.r = ab(Ca.normalWorld.x);
                    Aa.g = ab(Ca.normalWorld.y);
                    Aa.b = ab(Ca.normalWorld.z);
                    Aa.updateHex();
                    hb(xa, sa, Da, fa, ra, ea, za, ma);
                    W.wireframe ? Pa(Aa, W.wireframeLinewidth, W.wireframeLinecap, W.wireframeLinejoin) : Sa(Aa)
                } else if (W instanceof THREE.MeshDepthMaterial) {
                    Wa = ya.near;
                    N = ya.far;
                    ga.r = ga.g = ga.b = 1 - Za(Q.positionScreen.z, Wa, N);
                    ua.r = ua.g = ua.b = 1 - Za(qa.positionScreen.z, Wa, N);
                    Ja.r = Ja.g = Ja.b = 1 - Za(aa.positionScreen.z, Wa, N);
                    Ra.r = Ra.g = Ra.b = 1 - Za(ia.positionScreen.z, Wa, N);
                    Z = jb(ga, ua, Ja, Ra);
                    bb(xa, sa, Da, fa, za, ma);
                    eb(xa, sa, Da, fa, za, ma, Z, 0, 0, 1, 0, 0, 1);
                    bb(ta, pa, ra, ea, ja, Fa);
                    eb(ta, pa, ra, ea, ja, Fa, Z, 1, 0, 1, 1, 0, 1)
                }
            }
        }

        function bb(Q, qa, ia, aa, va, wa) {
            p.beginPath();
            p.moveTo(Q, qa);
            p.lineTo(ia, aa);
            p.lineTo(va, wa);
            p.lineTo(Q, qa);
            p.closePath()
        }

        function hb(Q, qa, ia, aa, va, wa, Ca, W) {
            p.beginPath();
            p.moveTo(Q,
                qa);
            p.lineTo(ia, aa);
            p.lineTo(va, wa);
            p.lineTo(Ca, W);
            p.lineTo(Q, qa);
            p.closePath()
        }

        function Pa(Q, qa, ia, aa) {
            if (V != qa)p.lineWidth = V = qa;
            if (O != ia)p.lineCap = O = ia;
            if (R != aa)p.lineJoin = R = aa;
            c(Q);
            p.stroke();
            K.inflate(qa * 2)
        }

        function Sa(Q) {
            f(Q);
            p.fill()
        }

        function eb(Q, qa, ia, aa, va, wa, Ca, W, Ia, $a, gb, Va, mb) {
            var ib, fb;
            ib = Ca.width - 1;
            fb = Ca.height - 1;
            W *= ib;
            Ia *= fb;
            $a *= ib;
            gb *= fb;
            Va *= ib;
            mb *= fb;
            ia -= Q;
            aa -= qa;
            va -= Q;
            wa -= qa;
            $a -= W;
            gb -= Ia;
            Va -= W;
            mb -= Ia;
            ib = $a * mb - Va * gb;
            if (ib != 0) {
                fb = 1 / ib;
                ib = (mb * ia - gb * va) * fb;
                gb = (mb * aa - gb * wa) * fb;
                ia = ($a *
                    va - Va * ia) * fb;
                aa = ($a * wa - Va * aa) * fb;
                Q = Q - ib * W - ia * Ia;
                qa = qa - gb * W - aa * Ia;
                p.save();
                p.transform(ib, gb, ia, aa, Q, qa);
                p.clip();
                p.drawImage(Ca, 0, 0);
                p.restore()
            }
        }

        function jb(Q, qa, ia, aa) {
            var va = ~~(Q.r * 255), wa = ~~(Q.g * 255);
            Q = ~~(Q.b * 255);
            var Ca = ~~(qa.r * 255), W = ~~(qa.g * 255);
            qa = ~~(qa.b * 255);
            var Ia = ~~(ia.r * 255), $a = ~~(ia.g * 255);
            ia = ~~(ia.b * 255);
            var gb = ~~(aa.r * 255), Va = ~~(aa.g * 255);
            aa = ~~(aa.b * 255);
            Ha[0] = va < 0 ? 0 : va > 255 ? 255 : va;
            Ha[1] = wa < 0 ? 0 : wa > 255 ? 255 : wa;
            Ha[2] = Q < 0 ? 0 : Q > 255 ? 255 : Q;
            Ha[4] = Ca < 0 ? 0 : Ca > 255 ? 255 : Ca;
            Ha[5] = W < 0 ? 0 : W > 255 ? 255 : W;
            Ha[6] = qa < 0 ? 0 : qa > 255 ? 255 : qa;
            Ha[8] = Ia < 0 ? 0 : Ia > 255 ? 255 : Ia;
            Ha[9] = $a < 0 ? 0 : $a > 255 ? 255 : $a;
            Ha[10] = ia < 0 ? 0 : ia > 255 ? 255 : ia;
            Ha[12] = gb < 0 ? 0 : gb > 255 ? 255 : gb;
            Ha[13] = Va < 0 ? 0 : Va > 255 ? 255 : Va;
            Ha[14] = aa < 0 ? 0 : aa > 255 ? 255 : aa;
            ka.putImageData(ha, 0, 0);
            La.drawImage(X, 0, 0);
            return Ba
        }

        function Za(Q, qa, ia) {
            Q = (Q - qa) / (ia - qa);
            return Q * Q * (3 - 2 * Q)
        }

        function ab(Q) {
            Q = (Q + 1) * 0.5;
            return Q < 0 ? 0 : Q > 1 ? 1 : Q
        }

        function Na(Q, qa) {
            var ia = qa.x - Q.x, aa = qa.y - Q.y, va = 1 / Math.sqrt(ia * ia + aa * aa);
            ia *= va;
            aa *= va;
            qa.x += ia;
            qa.y += aa;
            Q.x -= ia;
            Q.y -= aa
        }

        var cb, Ya, M, Oa, Ta, kb, lb, Qa;
        this.autoClear ? this.clear() : p.setTransform(1, 0, 0, -1, u, w);
        h.data.vertices = 0;
        h.data.faces = 0;
        j = k.projectScene(Ka, ya, this.sortElements);
        (L = Ka.lights.length > 0) && Ga(Ka);
        cb = 0;
        for (Ya = j.length; cb < Ya; cb++) {
            M = j[cb];
            K.empty();
            if (M instanceof THREE.RenderableParticle) {
                la = M;
                la.x *= u;
                la.y *= w;
                Oa = 0;
                for (Ta = M.materials.length; Oa < Ta;) {
                    Qa = M.materials[Oa++];
                    Qa.opacity != 0 && Ua(la, M, Qa, Ka)
                }
            } else if (M instanceof THREE.RenderableLine) {
                la = M.v1;
                da = M.v2;
                la.positionScreen.x *= u;
                la.positionScreen.y *= w;
                da.positionScreen.x *= u;
                da.positionScreen.y *=
                    w;
                K.addPoint(la.positionScreen.x, la.positionScreen.y);
                K.addPoint(da.positionScreen.x, da.positionScreen.y);
                if (v.instersects(K)) {
                    Oa = 0;
                    for (Ta = M.materials.length; Oa < Ta;) {
                        Qa = M.materials[Oa++];
                        Qa.opacity != 0 && F(la, da, M, Qa, Ka)
                    }
                }
            } else if (M instanceof THREE.RenderableFace3) {
                la = M.v1;
                da = M.v2;
                oa = M.v3;
                la.positionScreen.x *= u;
                la.positionScreen.y *= w;
                da.positionScreen.x *= u;
                da.positionScreen.y *= w;
                oa.positionScreen.x *= u;
                oa.positionScreen.y *= w;
                if (M.overdraw) {
                    Na(la.positionScreen, da.positionScreen);
                    Na(da.positionScreen,
                        oa.positionScreen);
                    Na(oa.positionScreen, la.positionScreen)
                }
                K.add3Points(la.positionScreen.x, la.positionScreen.y, da.positionScreen.x, da.positionScreen.y, oa.positionScreen.x, oa.positionScreen.y);
                if (v.instersects(K)) {
                    Oa = 0;
                    for (Ta = M.meshMaterials.length; Oa < Ta;) {
                        Qa = M.meshMaterials[Oa++];
                        if (Qa instanceof THREE.MeshFaceMaterial) {
                            kb = 0;
                            for (lb = M.faceMaterials.length; kb < lb;)(Qa = M.faceMaterials[kb++]) && Qa.opacity != 0 && ca(la, da, oa, 0, 1, 2, M, Qa, Ka)
                        } else Qa.opacity != 0 && ca(la, da, oa, 0, 1, 2, M, Qa, Ka)
                    }
                }
            } else if (M instanceof
                THREE.RenderableFace4) {
                la = M.v1;
                da = M.v2;
                oa = M.v3;
                $ = M.v4;
                la.positionScreen.x *= u;
                la.positionScreen.y *= w;
                da.positionScreen.x *= u;
                da.positionScreen.y *= w;
                oa.positionScreen.x *= u;
                oa.positionScreen.y *= w;
                $.positionScreen.x *= u;
                $.positionScreen.y *= w;
                na.positionScreen.copy(da.positionScreen);
                e.positionScreen.copy($.positionScreen);
                if (M.overdraw) {
                    Na(la.positionScreen, da.positionScreen);
                    Na(da.positionScreen, $.positionScreen);
                    Na($.positionScreen, la.positionScreen);
                    Na(oa.positionScreen, na.positionScreen);
                    Na(oa.positionScreen,
                        e.positionScreen)
                }
                K.addPoint(la.positionScreen.x, la.positionScreen.y);
                K.addPoint(da.positionScreen.x, da.positionScreen.y);
                K.addPoint(oa.positionScreen.x, oa.positionScreen.y);
                K.addPoint($.positionScreen.x, $.positionScreen.y);
                if (v.instersects(K)) {
                    Oa = 0;
                    for (Ta = M.meshMaterials.length; Oa < Ta;) {
                        Qa = M.meshMaterials[Oa++];
                        if (Qa instanceof THREE.MeshFaceMaterial) {
                            kb = 0;
                            for (lb = M.faceMaterials.length; kb < lb;)(Qa = M.faceMaterials[kb++]) && Qa.opacity != 0 && x(la, da, oa, $, na, e, M, Qa, Ka)
                        } else Qa.opacity != 0 && x(la, da, oa, $, na,
                            e, M, Qa, Ka)
                    }
                }
            }
            z.addRectangle(K)
        }
        p.setTransform(1, 0, 0, 1, 0, 0)
    }
};
THREE.SVGRenderer = function () {
    function b(ea, za, ma) {
        var ta, pa, ja, Fa;
        ta = 0;
        for (pa = ea.lights.length; ta < pa; ta++) {
            ja = ea.lights[ta];
            if (ja instanceof THREE.DirectionalLight) {
                Fa = za.normalWorld.dot(ja.position) * ja.intensity;
                if (Fa > 0) {
                    ma.r += ja.color.r * Fa;
                    ma.g += ja.color.g * Fa;
                    ma.b += ja.color.b * Fa
                }
            } else if (ja instanceof THREE.PointLight) {
                na.sub(ja.position, za.centroidWorld);
                na.normalize();
                Fa = za.normalWorld.dot(na) * ja.intensity;
                if (Fa > 0) {
                    ma.r += ja.color.r * Fa;
                    ma.g += ja.color.g * Fa;
                    ma.b += ja.color.b * Fa
                }
            }
        }
    }

    function d(ea, za,
               ma, ta, pa, ja) {
        j.data.vertices += 3;
        j.data.faces++;
        sa = f(Da++);
        sa.setAttribute("d", "M " + ea.positionScreen.x + " " + ea.positionScreen.y + " L " + za.positionScreen.x + " " + za.positionScreen.y + " L " + ma.positionScreen.x + "," + ma.positionScreen.y + "z");
        if (pa instanceof THREE.MeshBasicMaterial)O.hex = pa.color.hex; else if (pa instanceof THREE.MeshLambertMaterial)if (V) {
            R.r = la.r;
            R.g = la.g;
            R.b = la.b;
            b(ja, ta, R);
            O.r = Math.max(0, Math.min(pa.color.r * R.r, 1));
            O.g = Math.max(0, Math.min(pa.color.g * R.g, 1));
            O.b = Math.max(0, Math.min(pa.color.b *
                R.b, 1));
            O.updateHex()
        } else O.hex = pa.color.hex; else if (pa instanceof THREE.MeshDepthMaterial) {
            $ = 1 - pa.__2near / (pa.__farPlusNear - ta.z * pa.__farMinusNear);
            O.setRGB($, $, $)
        } else pa instanceof THREE.MeshNormalMaterial && O.setRGB(g(ta.normalWorld.x), g(ta.normalWorld.y), g(ta.normalWorld.z));
        pa.wireframe ? sa.setAttribute("style", "fill: none; stroke: #" + h(O.hex.toString(16)) + "; stroke-width: " + pa.wireframeLinewidth + "; stroke-opacity: " + pa.opacity + "; stroke-linecap: " + pa.wireframeLinecap + "; stroke-linejoin: " + pa.wireframeLinejoin) :
            sa.setAttribute("style", "fill: #" + h(O.hex.toString(16)) + "; fill-opacity: " + pa.opacity);
        o.appendChild(sa)
    }

    function c(ea, za, ma, ta, pa, ja, Fa) {
        j.data.vertices += 4;
        j.data.faces++;
        sa = f(Da++);
        sa.setAttribute("d", "M " + ea.positionScreen.x + " " + ea.positionScreen.y + " L " + za.positionScreen.x + " " + za.positionScreen.y + " L " + ma.positionScreen.x + "," + ma.positionScreen.y + " L " + ta.positionScreen.x + "," + ta.positionScreen.y + "z");
        if (ja instanceof THREE.MeshBasicMaterial)O.hex = ja.color.hex; else if (ja instanceof THREE.MeshLambertMaterial)if (V) {
            R.r =
                la.r;
            R.g = la.g;
            R.b = la.b;
            b(Fa, pa, R);
            O.r = Math.max(0, Math.min(ja.color.r * R.r, 1));
            O.g = Math.max(0, Math.min(ja.color.g * R.g, 1));
            O.b = Math.max(0, Math.min(ja.color.b * R.b, 1));
            O.updateHex()
        } else O.hex = ja.color.hex; else if (ja instanceof THREE.MeshDepthMaterial) {
            $ = 1 - ja.__2near / (ja.__farPlusNear - pa.z * ja.__farMinusNear);
            O.setRGB($, $, $)
        } else ja instanceof THREE.MeshNormalMaterial && O.setRGB(g(pa.normalWorld.x), g(pa.normalWorld.y), g(pa.normalWorld.z));
        ja.wireframe ? sa.setAttribute("style", "fill: none; stroke: #" + h(O.hex.toString(16)) +
            "; stroke-width: " + ja.wireframeLinewidth + "; stroke-opacity: " + ja.opacity + "; stroke-linecap: " + ja.wireframeLinecap + "; stroke-linejoin: " + ja.wireframeLinejoin) : sa.setAttribute("style", "fill: #" + h(O.hex.toString(16)) + "; fill-opacity: " + ja.opacity);
        o.appendChild(sa)
    }

    function f(ea) {
        if (e[ea] == null) {
            e[ea] = document.createElementNS("http://www.w3.org/2000/svg", "path");
            ra == 0 && e[ea].setAttribute("shape-rendering", "crispEdges")
        }
        return e[ea]
    }

    function g(ea) {
        ea = (ea + 1) * 0.5;
        return ea < 0 ? 0 : ea > 1 ? 1 : ea
    }

    function h(ea) {
        for (; ea.length <
               6;)ea = "0" + ea;
        return ea
    }

    var j = this, k = null, m = new THREE.Projector, o = document.createElementNS("http://www.w3.org/2000/svg", "svg"), t, u, w, p, A, I, H, C, U = new THREE.Rectangle, D = new THREE.Rectangle, V = !1, O = new THREE.Color(16777215), R = new THREE.Color(16777215), la = new THREE.Color(0), da = new THREE.Color(0), oa = new THREE.Color(0), $, na = new THREE.Vector3, e = [], xa = [], sa, Da, fa, ra = 1;
    this.domElement = o;
    this.autoClear = !0;
    this.sortObjects = !0;
    this.sortElements = !0;
    this.data = {vertices: 0, faces: 0};
    this.setQuality = function (ea) {
        switch (ea) {
            case "high":
                ra =
                    1;
                break;
            case "low":
                ra = 0
        }
    };
    this.setSize = function (ea, za) {
        t = ea;
        u = za;
        w = t / 2;
        p = u / 2;
        o.setAttribute("viewBox", -w + " " + -p + " " + t + " " + u);
        o.setAttribute("width", t);
        o.setAttribute("height", u);
        U.set(-w, -p, w, p)
    };
    this.clear = function () {
        for (; o.childNodes.length > 0;)o.removeChild(o.childNodes[0])
    };
    this.render = function (ea, za) {
        var ma, ta, pa, ja, Fa, Aa, ga, ua;
        this.autoClear && this.clear();
        j.data.vertices = 0;
        j.data.faces = 0;
        k = m.projectScene(ea, za, this.sortElements);
        fa = Da = 0;
        if (V = ea.lights.length > 0) {
            ga = ea.lights;
            la.setRGB(0, 0, 0);
            da.setRGB(0, 0, 0);
            oa.setRGB(0, 0, 0);
            ma = 0;
            for (ta = ga.length; ma < ta; ma++) {
                pa = ga[ma];
                ja = pa.color;
                if (pa instanceof THREE.AmbientLight) {
                    la.r += ja.r;
                    la.g += ja.g;
                    la.b += ja.b
                } else if (pa instanceof THREE.DirectionalLight) {
                    da.r += ja.r;
                    da.g += ja.g;
                    da.b += ja.b
                } else if (pa instanceof THREE.PointLight) {
                    oa.r += ja.r;
                    oa.g += ja.g;
                    oa.b += ja.b
                }
            }
        }
        ma = 0;
        for (ta = k.length; ma < ta; ma++) {
            ga = k[ma];
            D.empty();
            if (ga instanceof THREE.RenderableParticle) {
                A = ga;
                A.x *= w;
                A.y *= -p;
                pa = 0;
                for (ja = ga.materials.length; pa < ja;)pa++
            } else if (ga instanceof THREE.RenderableLine) {
                A =
                    ga.v1;
                I = ga.v2;
                A.positionScreen.x *= w;
                A.positionScreen.y *= -p;
                I.positionScreen.x *= w;
                I.positionScreen.y *= -p;
                D.addPoint(A.positionScreen.x, A.positionScreen.y);
                D.addPoint(I.positionScreen.x, I.positionScreen.y);
                if (U.instersects(D)) {
                    pa = 0;
                    for (ja = ga.materials.length; pa < ja;)if ((ua = ga.materials[pa++]) && ua.opacity != 0) {
                        Fa = A;
                        Aa = I;
                        var Ja = fa++;
                        if (xa[Ja] == null) {
                            xa[Ja] = document.createElementNS("http://www.w3.org/2000/svg", "line");
                            ra == 0 && xa[Ja].setAttribute("shape-rendering", "crispEdges")
                        }
                        sa = xa[Ja];
                        sa.setAttribute("x1",
                            Fa.positionScreen.x);
                        sa.setAttribute("y1", Fa.positionScreen.y);
                        sa.setAttribute("x2", Aa.positionScreen.x);
                        sa.setAttribute("y2", Aa.positionScreen.y);
                        if (ua instanceof THREE.LineBasicMaterial) {
                            sa.setAttribute("style", "fill: none; stroke: ##" + h(ua.color.hex.toString(16)) + "; stroke-width: " + ua.linewidth + "; stroke-opacity: " + ua.opacity + "; stroke-linecap: " + ua.linecap + "; stroke-linejoin: " + ua.linejoin);
                            o.appendChild(sa)
                        }
                    }
                }
            } else if (ga instanceof THREE.RenderableFace3) {
                A = ga.v1;
                I = ga.v2;
                H = ga.v3;
                A.positionScreen.x *=
                    w;
                A.positionScreen.y *= -p;
                I.positionScreen.x *= w;
                I.positionScreen.y *= -p;
                H.positionScreen.x *= w;
                H.positionScreen.y *= -p;
                D.addPoint(A.positionScreen.x, A.positionScreen.y);
                D.addPoint(I.positionScreen.x, I.positionScreen.y);
                D.addPoint(H.positionScreen.x, H.positionScreen.y);
                if (U.instersects(D)) {
                    pa = 0;
                    for (ja = ga.meshMaterials.length; pa < ja;) {
                        ua = ga.meshMaterials[pa++];
                        if (ua instanceof THREE.MeshFaceMaterial) {
                            Fa = 0;
                            for (Aa = ga.faceMaterials.length; Fa < Aa;)(ua = ga.faceMaterials[Fa++]) && ua.opacity != 0 && d(A, I, H, ga, ua, ea)
                        } else ua &&
                        ua.opacity != 0 && d(A, I, H, ga, ua, ea)
                    }
                }
            } else if (ga instanceof THREE.RenderableFace4) {
                A = ga.v1;
                I = ga.v2;
                H = ga.v3;
                C = ga.v4;
                A.positionScreen.x *= w;
                A.positionScreen.y *= -p;
                I.positionScreen.x *= w;
                I.positionScreen.y *= -p;
                H.positionScreen.x *= w;
                H.positionScreen.y *= -p;
                C.positionScreen.x *= w;
                C.positionScreen.y *= -p;
                D.addPoint(A.positionScreen.x, A.positionScreen.y);
                D.addPoint(I.positionScreen.x, I.positionScreen.y);
                D.addPoint(H.positionScreen.x, H.positionScreen.y);
                D.addPoint(C.positionScreen.x, C.positionScreen.y);
                if (U.instersects(D)) {
                    pa =
                        0;
                    for (ja = ga.meshMaterials.length; pa < ja;) {
                        ua = ga.meshMaterials[pa++];
                        if (ua instanceof THREE.MeshFaceMaterial) {
                            Fa = 0;
                            for (Aa = ga.faceMaterials.length; Fa < Aa;)(ua = ga.faceMaterials[Fa++]) && ua.opacity != 0 && c(A, I, H, C, ga, ua, ea)
                        } else ua && ua.opacity != 0 && c(A, I, H, C, ga, ua, ea)
                    }
                }
            }
        }
    }
};
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\n#endif",
    map_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_pars_vertex: "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
    lights_vertex: "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat pointLightWeighting = max( dot( transformedNormal, lVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef PHONG\nvPointLight[ i ] = vec4( lVector, lDistance );\n#endif\n}\n#endif\n}",
    lights_pars_fragment: "#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec3 pointVector = normalize( vPointLight[ i ].xyz );\nvec3 pointHalfVector = normalize( vPointLight[ i ].xyz + vViewPosition );\nfloat pointDistance = vPointLight[ i ].w;\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight * pointDistance;\npointSpecular += mSpecular * pointSpecularWeight * pointDistance;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"
};
THREE.UniformsUtils = {
    merge: function (b) {
        var d, c, f, g = {};
        for (d = 0; d < b.length; d++) {
            f = this.clone(b[d]);
            for (c in f)g[c] = f[c]
        }
        return g
    }, clone: function (b) {
        var d, c, f, g = {};
        for (d in b) {
            g[d] = {};
            for (c in b[d]) {
                f = b[d][c];
                g[d][c] = f instanceof THREE.Color || f instanceof THREE.Vector3 || f instanceof THREE.Texture ? f.clone() : f
            }
        }
        return g
    }
};
THREE.UniformsLib = {
    common: {
        diffuse: {type: "c", value: new THREE.Color(15658734)},
        opacity: {type: "f", value: 1},
        map: {type: "t", value: 0, texture: null},
        lightMap: {type: "t", value: 2, texture: null},
        envMap: {type: "t", value: 1, texture: null},
        useRefract: {type: "i", value: 0},
        reflectivity: {type: "f", value: 1},
        refractionRatio: {type: "f", value: 0.98},
        combine: {type: "i", value: 0},
        fogDensity: {type: "f", value: 2.5E-4},
        fogNear: {type: "f", value: 1},
        fogFar: {type: "f", value: 2E3},
        fogColor: {type: "c", value: new THREE.Color(16777215)},
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    lights: {
        enableLighting: {type: "i", value: 1},
        ambientLightColor: {type: "fv", value: []},
        directionalLightDirection: {type: "fv", value: []},
        directionalLightColor: {type: "fv", value: []},
        pointLightColor: {type: "fv", value: []},
        pointLightPosition: {type: "fv", value: []},
        pointLightDistance: {type: "fv1", value: []}
    },
    particle: {
        psColor: {type: "c", value: new THREE.Color(15658734)},
        opacity: {type: "f", value: 1},
        size: {type: "f", value: 1},
        scale: {type: "f", value: 1},
        map: {type: "t", value: 0, texture: null},
        fogDensity: {type: "f", value: 2.5E-4},
        fogNear: {type: "f", value: 1},
        fogFar: {type: "f", value: 2E3},
        fogColor: {type: "c", value: new THREE.Color(16777215)}
    }
};
THREE.ShaderLib = {
    lensFlareVertexTexture: {
        vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nuniform\tsampler2D\tocclusionMap;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvarying\tfloat\tvVisibility;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 )) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ));\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvarying\tfloat\t\tvVisibility;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * vVisibility;\ngl_FragColor = color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform \tvec3 \tscreenPosition;\nuniform\tvec2\tscale;\nuniform\tfloat\trotation;\nuniform    int     renderType;\nattribute \tvec2 \tposition;\nattribute  vec2\tUV;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = UV;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4(( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tsampler2D\tocclusionMap;\nuniform\tfloat\t\topacity;\nuniform    int         renderType;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 )).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 )).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 )).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 )).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity * visibility;\ngl_FragColor = color;\n}\n}"
    },
    sprite: {
        vertexShader: "uniform\tint\t\tuseScreenCoordinates;\nuniform    int     affectedByDistance;\nuniform\tvec3\tscreenPosition;\nuniform \tmat4 \tmodelViewMatrix;\nuniform \tmat4 \tprojectionMatrix;\nuniform    float   rotation;\nuniform    vec2    scale;\nuniform    vec2    alignment;\nuniform    vec2    uvOffset;\nuniform\tvec2    uvScale;\nattribute \tvec2 \tposition;\nattribute  vec2\tuv;\nvarying\tvec2\tvUV;\nvoid main(void)\n{\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( affectedByDistance == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform\tsampler2D\tmap;\nuniform\tfloat\t\topacity;\nvarying\tvec2\t\tvUV;\nvoid main( void )\n{\nvec4 color = texture2D( map, vUV );\ncolor.a *= opacity;\ngl_FragColor = color;\n}"
    },
    shadowPost: {
        vertexShader: "uniform \tmat4 \tprojectionMatrix;\nattribute \tvec3 \tposition;\nvoid main(void)\n{\ngl_Position = projectionMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform \tfloat \tdarkness;\nvoid main( void )\n{\ngl_FragColor = vec4( 0, 0, 0, darkness );\n}"
    },
    shadowVolumeDynamic: {
        uniforms: {directionalLightDirection: {type: "fv", value: []}},
        vertexShader: "uniform \tvec3 \tdirectionalLightDirection;\nvoid main() {\nvec4 pos      = objectMatrix * vec4( position, 1.0 );\nvec3 norm     = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nvec4 extruded = vec4( directionalLightDirection * 5000.0 * step( 0.0, dot( directionalLightDirection, norm )), 0.0 );\ngl_Position   = projectionMatrix * viewMatrix * ( pos + extruded );\n}",
        fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0 );\n}"
    },
    depth: {
        uniforms: {mNear: {type: "f", value: 1}, mFar: {type: "f", value: 2E3}, opacity: {type: "f", value: 1}},
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"
    },
    normal: {
        uniforms: {opacity: {type: "f", value: 1}},
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"
    },
    basic: {
        uniforms: THREE.UniformsLib.common,
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment,
            THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex,
            THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment,
            THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["varying vec3 vLightWeighting;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex,
            THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
            ambient: {
                type: "c",
                value: new THREE.Color(328965)
            }, specular: {type: "c", value: new THREE.Color(1118481)}, shininess: {type: "f", value: 30}
        }]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, "void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.map_fragment,
            THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex,
            "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex,
            THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsLib.particle,
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["uniform float size;\nuniform float scale;",
            THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")
    }
};
THREE.WebGLRenderer = function (b) {
    function d(n, E, y) {
        var v, z, K, L = n.vertices, G = L.length, P = n.colors, Y = P.length, B = n.__vertexArray, J = n.__colorArray, X = n.__sortArray, ka = n.__dirtyVertices, ha = n.__dirtyColors;
        if (y.sortParticles) {
            ua.multiplySelf(y.matrixWorld);
            for (v = 0; v < G; v++) {
                z = L[v].position;
                Wa.copy(z);
                ua.multiplyVector3(Wa);
                X[v] = [Wa.z, v]
            }
            X.sort(function (Ha, Ba) {
                return Ba[0] - Ha[0]
            });
            for (v = 0; v < G; v++) {
                z = L[X[v][1]].position;
                K = v * 3;
                B[K] = z.x;
                B[K + 1] = z.y;
                B[K + 2] = z.z
            }
            for (v = 0; v < Y; v++) {
                K = v * 3;
                color = P[X[v][1]];
                J[K] = color.r;
                J[K + 1] = color.g;
                J[K + 2] = color.b
            }
        } else {
            if (ka)for (v = 0; v < G; v++) {
                z = L[v].position;
                K = v * 3;
                B[K] = z.x;
                B[K + 1] = z.y;
                B[K + 2] = z.z
            }
            if (ha)for (v = 0; v < Y; v++) {
                color = P[v];
                K = v * 3;
                J[K] = color.r;
                J[K + 1] = color.g;
                J[K + 2] = color.b
            }
        }
        if (ka || y.sortParticles) {
            e.bindBuffer(e.ARRAY_BUFFER, n.__webglVertexBuffer);
            e.bufferData(e.ARRAY_BUFFER, B, E)
        }
        if (ha || y.sortParticles) {
            e.bindBuffer(e.ARRAY_BUFFER, n.__webglColorBuffer);
            e.bufferData(e.ARRAY_BUFFER, J, E)
        }
    }

    function c(n, E, y, v, z) {
        v.program || na.initMaterial(v, E, y, z);
        var K = v.program, L = K.uniforms, G =
            v.uniforms;
        if (K != Da) {
            e.useProgram(K);
            Da = K
        }
        e.uniformMatrix4fv(L.projectionMatrix, !1, Ja);
        if (y && (v instanceof THREE.MeshBasicMaterial || v instanceof THREE.MeshLambertMaterial || v instanceof THREE.MeshPhongMaterial || v instanceof THREE.LineBasicMaterial || v instanceof THREE.ParticleBasicMaterial || v.fog)) {
            G.fogColor.value = y.color;
            if (y instanceof THREE.Fog) {
                G.fogNear.value = y.near;
                G.fogFar.value = y.far
            } else if (y instanceof THREE.FogExp2)G.fogDensity.value = y.density
        }
        if (v instanceof THREE.MeshPhongMaterial || v instanceof
            THREE.MeshLambertMaterial || v.lights) {
            var P, Y, B = 0, J = 0, X = 0, ka, ha, Ha, Ba, La = N, Xa = La.directional.colors, Ka = La.directional.positions, ya = La.point.colors, Ga = La.point.positions, Ea = La.point.distances, Ua = 0, F = 0;
            y = Y = Ba = 0;
            for (P = E.length; y < P; y++) {
                Y = E[y];
                ka = Y.color;
                ha = Y.position;
                Ha = Y.intensity;
                Ba = Y.distance;
                if (Y instanceof THREE.AmbientLight) {
                    B += ka.r;
                    J += ka.g;
                    X += ka.b
                } else if (Y instanceof THREE.DirectionalLight) {
                    Ba = Ua * 3;
                    Xa[Ba] = ka.r * Ha;
                    Xa[Ba + 1] = ka.g * Ha;
                    Xa[Ba + 2] = ka.b * Ha;
                    Ka[Ba] = ha.x;
                    Ka[Ba + 1] = ha.y;
                    Ka[Ba + 2] = ha.z;
                    Ua += 1
                } else if (Y instanceof
                    THREE.PointLight) {
                    Y = F * 3;
                    ya[Y] = ka.r * Ha;
                    ya[Y + 1] = ka.g * Ha;
                    ya[Y + 2] = ka.b * Ha;
                    Ga[Y] = ha.x;
                    Ga[Y + 1] = ha.y;
                    Ga[Y + 2] = ha.z;
                    Ea[F] = Ba;
                    F += 1
                }
            }
            for (y = Ua * 3; y < Xa.length; y++)Xa[y] = 0;
            for (y = F * 3; y < ya.length; y++)ya[y] = 0;
            La.point.length = F;
            La.directional.length = Ua;
            La.ambient[0] = B;
            La.ambient[1] = J;
            La.ambient[2] = X;
            y = N;
            G.enableLighting.value = y.directional.length + y.point.length;
            G.ambientLightColor.value = y.ambient;
            G.directionalLightColor.value = y.directional.colors;
            G.directionalLightDirection.value = y.directional.positions;
            G.pointLightColor.value =
                y.point.colors;
            G.pointLightPosition.value = y.point.positions;
            G.pointLightDistance.value = y.point.distances
        }
        if (v instanceof THREE.MeshBasicMaterial || v instanceof THREE.MeshLambertMaterial || v instanceof THREE.MeshPhongMaterial) {
            G.diffuse.value = v.color;
            G.opacity.value = v.opacity;
            G.map.texture = v.map;
            G.lightMap.texture = v.lightMap;
            G.envMap.texture = v.envMap;
            G.reflectivity.value = v.reflectivity;
            G.refractionRatio.value = v.refractionRatio;
            G.combine.value = v.combine;
            G.useRefract.value = v.envMap && v.envMap.mapping instanceof
                THREE.CubeRefractionMapping
        }
        if (v instanceof THREE.LineBasicMaterial) {
            G.diffuse.value = v.color;
            G.opacity.value = v.opacity
        } else if (v instanceof THREE.ParticleBasicMaterial) {
            G.psColor.value = v.color;
            G.opacity.value = v.opacity;
            G.size.value = v.size;
            G.scale.value = xa.height / 2;
            G.map.texture = v.map
        } else if (v instanceof THREE.MeshPhongMaterial) {
            G.ambient.value = v.ambient;
            G.specular.value = v.specular;
            G.shininess.value = v.shininess
        } else if (v instanceof THREE.MeshDepthMaterial) {
            G.mNear.value = n.near;
            G.mFar.value = n.far;
            G.opacity.value = v.opacity
        } else if (v instanceof THREE.MeshNormalMaterial)G.opacity.value = v.opacity;
        for (var ca in G)if (J = K.uniforms[ca]) {
            P = G[ca];
            B = P.type;
            y = P.value;
            if (B == "i")e.uniform1i(J, y); else if (B == "f")e.uniform1f(J, y); else if (B == "fv1")e.uniform1fv(J, y); else if (B == "fv")e.uniform3fv(J, y); else if (B == "v2")e.uniform2f(J, y.x, y.y); else if (B == "v3")e.uniform3f(J, y.x, y.y, y.z); else if (B == "v4")e.uniform4f(J, y.x, y.y, y.z, y.w); else if (B == "c")e.uniform3f(J, y.r, y.g, y.b); else if (B == "t") {
                e.uniform1i(J, y);
                if (P = P.texture)if (P.image instanceof
                    Array && P.image.length == 6) {
                    if (P.image.length == 6) {
                        if (P.needsUpdate) {
                            if (P.__webglInit) {
                                e.bindTexture(e.TEXTURE_CUBE_MAP, P.image.__webglTextureCube);
                                for (B = 0; B < 6; ++B)e.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + B, 0, 0, 0, e.RGBA, e.UNSIGNED_BYTE, P.image[B])
                            } else {
                                P.image.__webglTextureCube = e.createTexture();
                                e.bindTexture(e.TEXTURE_CUBE_MAP, P.image.__webglTextureCube);
                                for (B = 0; B < 6; ++B)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + B, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, P.image[B]);
                                P.__webglInit = !0
                            }
                            O(e.TEXTURE_CUBE_MAP,
                                P, P.image[0]);
                            e.bindTexture(e.TEXTURE_CUBE_MAP, null);
                            P.needsUpdate = !1
                        }
                        e.activeTexture(e.TEXTURE0 + y);
                        e.bindTexture(e.TEXTURE_CUBE_MAP, P.image.__webglTextureCube)
                    }
                } else R(P, y)
            }
        }
        e.uniformMatrix4fv(L.modelViewMatrix, !1, z._modelViewMatrixArray);
        e.uniformMatrix3fv(L.normalMatrix, !1, z._normalMatrixArray);
        (v instanceof THREE.MeshShaderMaterial || v instanceof THREE.MeshPhongMaterial || v.envMap) && L.cameraPosition !== null && e.uniform3f(L.cameraPosition, n.position.x, n.position.y, n.position.z);
        (v instanceof THREE.MeshShaderMaterial ||
        v.envMap || v.skinning) && L.objectMatrix !== null && e.uniformMatrix4fv(L.objectMatrix, !1, z._objectMatrixArray);
        (v instanceof THREE.MeshPhongMaterial || v instanceof THREE.MeshLambertMaterial || v instanceof THREE.MeshShaderMaterial || v.skinning) && L.viewMatrix !== null && e.uniformMatrix4fv(L.viewMatrix, !1, Ra);
        if (v instanceof THREE.ShadowVolumeDynamicMaterial) {
            n = G.directionalLightDirection.value;
            n[0] = -E[1].position.x;
            n[1] = -E[1].position.y;
            n[2] = -E[1].position.z;
            e.uniform3fv(L.directionalLightDirection, n);
            e.uniformMatrix4fv(L.objectMatrix,
                !1, z._objectMatrixArray);
            e.uniformMatrix4fv(L.viewMatrix, !1, Ra)
        }
        if (v.skinning) {
            e.uniformMatrix4fv(L.cameraInverseMatrix, !1, Ra);
            e.uniformMatrix4fv(L.boneGlobalMatrices, !1, z.boneMatrices)
        }
        return K
    }

    function f(n, E, y, v, z, K) {
        if (v.opacity != 0) {
            var L;
            n = c(n, E, y, v, K).attributes;
            if (!v.morphTargets && n.position >= 0) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglVertexBuffer);
                e.vertexAttribPointer(n.position, 3, e.FLOAT, !1, 0, 0)
            } else {
                E = v.program.attributes;
                if (K.morphTargetBase !== -1) {
                    e.bindBuffer(e.ARRAY_BUFFER, z.__webglMorphTargetsBuffers[K.morphTargetBase]);
                    e.vertexAttribPointer(E.position, 3, e.FLOAT, !1, 0, 0)
                } else if (E.position >= 0) {
                    e.bindBuffer(e.ARRAY_BUFFER, z.__webglVertexBuffer);
                    e.vertexAttribPointer(E.position, 3, e.FLOAT, !1, 0, 0)
                }
                if (K.morphTargetForcedOrder.length) {
                    y = 0;
                    for (var G = K.morphTargetForcedOrder, P = K.morphTargetInfluences; y < v.numSupportedMorphTargets && y < G.length;) {
                        e.bindBuffer(e.ARRAY_BUFFER, z.__webglMorphTargetsBuffers[G[y]]);
                        e.vertexAttribPointer(E["morphTarget" + y], 3, e.FLOAT, !1, 0, 0);
                        K.__webglMorphTargetInfluences[y] = P[G[y]];
                        y++
                    }
                } else {
                    G = [];
                    var Y =
                        -1, B = 0;
                    P = K.morphTargetInfluences;
                    var J, X = P.length;
                    y = 0;
                    for (K.morphTargetBase !== -1 && (G[K.morphTargetBase] = !0); y < v.numSupportedMorphTargets;) {
                        for (J = 0; J < X; J++)if (!G[J] && P[J] > Y) {
                            B = J;
                            Y = P[B]
                        }
                        e.bindBuffer(e.ARRAY_BUFFER, z.__webglMorphTargetsBuffers[B]);
                        e.vertexAttribPointer(E["morphTarget" + y], 3, e.FLOAT, !1, 0, 0);
                        K.__webglMorphTargetInfluences[y] = Y;
                        G[B] = 1;
                        Y = -1;
                        y++
                    }
                }
                v.program.uniforms.morphTargetInfluences !== null && e.uniform1fv(v.program.uniforms.morphTargetInfluences, K.__webglMorphTargetInfluences)
            }
            if (v.attributes)for (L in v.attributes)if (n[L] !==
                undefined && n[L] >= 0) {
                E = v.attributes[L];
                if (E.buffer) {
                    e.bindBuffer(e.ARRAY_BUFFER, E.buffer);
                    e.vertexAttribPointer(n[L], E.size, e.FLOAT, !1, 0, 0)
                }
            }
            if (n.color >= 0) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglColorBuffer);
                e.vertexAttribPointer(n.color, 3, e.FLOAT, !1, 0, 0)
            }
            if (n.normal >= 0) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglNormalBuffer);
                e.vertexAttribPointer(n.normal, 3, e.FLOAT, !1, 0, 0)
            }
            if (n.tangent >= 0) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglTangentBuffer);
                e.vertexAttribPointer(n.tangent, 4, e.FLOAT, !1, 0, 0)
            }
            if (n.uv >= 0)if (z.__webglUVBuffer) {
                e.bindBuffer(e.ARRAY_BUFFER,
                    z.__webglUVBuffer);
                e.vertexAttribPointer(n.uv, 2, e.FLOAT, !1, 0, 0);
                e.enableVertexAttribArray(n.uv)
            } else e.disableVertexAttribArray(n.uv);
            if (n.uv2 >= 0)if (z.__webglUV2Buffer) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglUV2Buffer);
                e.vertexAttribPointer(n.uv2, 2, e.FLOAT, !1, 0, 0);
                e.enableVertexAttribArray(n.uv2)
            } else e.disableVertexAttribArray(n.uv2);
            if (v.skinning && n.skinVertexA >= 0 && n.skinVertexB >= 0 && n.skinIndex >= 0 && n.skinWeight >= 0) {
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglSkinVertexABuffer);
                e.vertexAttribPointer(n.skinVertexA,
                    4, e.FLOAT, !1, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglSkinVertexBBuffer);
                e.vertexAttribPointer(n.skinVertexB, 4, e.FLOAT, !1, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglSkinIndicesBuffer);
                e.vertexAttribPointer(n.skinIndex, 4, e.FLOAT, !1, 0, 0);
                e.bindBuffer(e.ARRAY_BUFFER, z.__webglSkinWeightsBuffer);
                e.vertexAttribPointer(n.skinWeight, 4, e.FLOAT, !1, 0, 0)
            }
            if (K instanceof THREE.Mesh) {
                if (v.wireframe) {
                    e.lineWidth(v.wireframeLinewidth);
                    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, z.__webglLineBuffer);
                    e.drawElements(e.LINES,
                        z.__webglLineCount, e.UNSIGNED_SHORT, 0)
                } else {
                    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, z.__webglFaceBuffer);
                    e.drawElements(e.TRIANGLES, z.__webglFaceCount, e.UNSIGNED_SHORT, 0)
                }
                na.data.vertices += z.__webglFaceCount;
                na.data.faces += z.__webglFaceCount / 3;
                na.data.drawCalls++
            } else if (K instanceof THREE.Line) {
                K = K.type == THREE.LineStrip ? e.LINE_STRIP : e.LINES;
                e.lineWidth(v.linewidth);
                e.drawArrays(K, 0, z.__webglLineCount);
                na.data.drawCalls++
            } else if (K instanceof THREE.ParticleSystem) {
                e.drawArrays(e.POINTS, 0, z.__webglParticleCount);
                na.data.drawCalls++
            } else if (K instanceof THREE.Ribbon) {
                e.drawArrays(e.TRIANGLE_STRIP, 0, z.__webglVertexCount);
                na.data.drawCalls++
            }
        }
    }

    function g(n, E, y) {
        if (!n.__webglVertexBuffer)n.__webglVertexBuffer = e.createBuffer();
        if (!n.__webglNormalBuffer)n.__webglNormalBuffer = e.createBuffer();
        if (n.hasPos) {
            e.bindBuffer(e.ARRAY_BUFFER, n.__webglVertexBuffer);
            e.bufferData(e.ARRAY_BUFFER, n.positionArray, e.DYNAMIC_DRAW);
            e.enableVertexAttribArray(E.attributes.position);
            e.vertexAttribPointer(E.attributes.position, 3, e.FLOAT,
                !1, 0, 0)
        }
        if (n.hasNormal) {
            e.bindBuffer(e.ARRAY_BUFFER, n.__webglNormalBuffer);
            if (y == THREE.FlatShading) {
                var v, z, K, L, G, P, Y, B, J, X, ka = n.count * 3;
                for (X = 0; X < ka; X += 9) {
                    y = n.normalArray;
                    v = y[X];
                    z = y[X + 1];
                    K = y[X + 2];
                    L = y[X + 3];
                    P = y[X + 4];
                    B = y[X + 5];
                    G = y[X + 6];
                    Y = y[X + 7];
                    J = y[X + 8];
                    v = (v + L + G) / 3;
                    z = (z + P + Y) / 3;
                    K = (K + B + J) / 3;
                    y[X] = v;
                    y[X + 1] = z;
                    y[X + 2] = K;
                    y[X + 3] = v;
                    y[X + 4] = z;
                    y[X + 5] = K;
                    y[X + 6] = v;
                    y[X + 7] = z;
                    y[X + 8] = K
                }
            }
            e.bufferData(e.ARRAY_BUFFER, n.normalArray, e.DYNAMIC_DRAW);
            e.enableVertexAttribArray(E.attributes.normal);
            e.vertexAttribPointer(E.attributes.normal,
                3, e.FLOAT, !1, 0, 0)
        }
        e.drawArrays(e.TRIANGLES, 0, n.count);
        n.count = 0
    }

    function h(n) {
        if (ea != n.doubleSided) {
            n.doubleSided ? e.disable(e.CULL_FACE) : e.enable(e.CULL_FACE);
            ea = n.doubleSided
        }
        if (za != n.flipSided) {
            n.flipSided ? e.frontFace(e.CW) : e.frontFace(e.CCW);
            za = n.flipSided
        }
    }

    function j(n) {
        if (ta != n) {
            n ? e.enable(e.DEPTH_TEST) : e.disable(e.DEPTH_TEST);
            ta = n
        }
    }

    function k(n) {
        ga[0].set(n.n41 - n.n11, n.n42 - n.n12, n.n43 - n.n13, n.n44 - n.n14);
        ga[1].set(n.n41 + n.n11, n.n42 + n.n12, n.n43 + n.n13, n.n44 + n.n14);
        ga[2].set(n.n41 + n.n21, n.n42 + n.n22,
            n.n43 + n.n23, n.n44 + n.n24);
        ga[3].set(n.n41 - n.n21, n.n42 - n.n22, n.n43 - n.n23, n.n44 - n.n24);
        ga[4].set(n.n41 - n.n31, n.n42 - n.n32, n.n43 - n.n33, n.n44 - n.n34);
        ga[5].set(n.n41 + n.n31, n.n42 + n.n32, n.n43 + n.n33, n.n44 + n.n34);
        var E;
        for (n = 0; n < 6; n++) {
            E = ga[n];
            E.divideScalar(Math.sqrt(E.x * E.x + E.y * E.y + E.z * E.z))
        }
    }

    function m(n) {
        for (var E = n.matrixWorld, y = -n.geometry.boundingSphere.radius * Math.max(n.scale.x, Math.max(n.scale.y, n.scale.z)), v = 0; v < 6; v++) {
            n = ga[v].x * E.n14 + ga[v].y * E.n24 + ga[v].z * E.n34 + ga[v].w;
            if (n <= y)return !1
        }
        return !0
    }

    function o(n,
               E) {
        n.list[n.count] = E;
        n.count += 1
    }

    function t(n) {
        var E, y, v = n.object, z = n.opaque, K = n.transparent;
        K.count = 0;
        n = z.count = 0;
        for (E = v.materials.length; n < E; n++) {
            y = v.materials[n];
            y.transparent ? o(K, y) : o(z, y)
        }
    }

    function u(n) {
        var E, y, v, z, K = n.object, L = n.buffer, G = n.opaque, P = n.transparent;
        P.count = 0;
        n = G.count = 0;
        for (v = K.materials.length; n < v; n++) {
            E = K.materials[n];
            if (E instanceof THREE.MeshFaceMaterial) {
                E = 0;
                for (y = L.materials.length; E < y; E++)(z = L.materials[E]) && (z.transparent ? o(P, z) : o(G, z))
            } else(z = E) && (z.transparent ? o(P, z) :
                o(G, z))
        }
    }

    function w(n, E) {
        return E.z - n.z
    }

    function p(n) {
        e.enable(e.POLYGON_OFFSET_FILL);
        e.polygonOffset(0.1, 1);
        e.enable(e.STENCIL_TEST);
        e.enable(e.DEPTH_TEST);
        e.depthMask(!1);
        e.colorMask(!1, !1, !1, !1);
        e.stencilFunc(e.ALWAYS, 1, 255);
        e.stencilOpSeparate(e.BACK, e.KEEP, e.INCR, e.KEEP);
        e.stencilOpSeparate(e.FRONT, e.KEEP, e.DECR, e.KEEP);
        var E, y = n.lights.length, v, z = n.lights, K = [], L, G, P, Y, B, J = n.__webglShadowVolumes.length;
        for (E = 0; E < y; E++) {
            v = n.lights[E];
            if (v instanceof THREE.DirectionalLight && v.castShadow) {
                K[0] = -v.position.x;
                K[1] = -v.position.y;
                K[2] = -v.position.z;
                for (B = 0; B < J; B++) {
                    v = n.__webglShadowVolumes[B].object;
                    L = n.__webglShadowVolumes[B].buffer;
                    G = v.materials[0];
                    G.program || na.initMaterial(G, z, undefined, v);
                    G = G.program;
                    P = G.uniforms;
                    Y = G.attributes;
                    if (Da !== G) {
                        e.useProgram(G);
                        Da = G;
                        e.uniformMatrix4fv(P.projectionMatrix, !1, Ja);
                        e.uniformMatrix4fv(P.viewMatrix, !1, Ra);
                        e.uniform3fv(P.directionalLightDirection, K)
                    }
                    v.matrixWorld.flattenToArray(v._objectMatrixArray);
                    e.uniformMatrix4fv(P.objectMatrix, !1, v._objectMatrixArray);
                    e.bindBuffer(e.ARRAY_BUFFER, L.__webglVertexBuffer);
                    e.vertexAttribPointer(Y.position, 3, e.FLOAT, !1, 0, 0);
                    e.bindBuffer(e.ARRAY_BUFFER, L.__webglNormalBuffer);
                    e.vertexAttribPointer(Y.normal, 3, e.FLOAT, !1, 0, 0);
                    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, L.__webglFaceBuffer);
                    e.cullFace(e.FRONT);
                    e.drawElements(e.TRIANGLES, L.__webglFaceCount, e.UNSIGNED_SHORT, 0);
                    e.cullFace(e.BACK);
                    e.drawElements(e.TRIANGLES, L.__webglFaceCount, e.UNSIGNED_SHORT, 0)
                }
            }
        }
        e.disable(e.POLYGON_OFFSET_FILL);
        e.colorMask(!0, !0, !0, !0);
        e.stencilFunc(e.NOTEQUAL,
            0, 255);
        e.stencilOp(e.KEEP, e.KEEP, e.KEEP);
        e.disable(e.DEPTH_TEST);
        ma = -1;
        Da = S.program;
        e.useProgram(S.program);
        e.uniformMatrix4fv(S.projectionLocation, !1, Ja);
        e.uniform1f(S.darknessLocation, S.darkness);
        e.bindBuffer(e.ARRAY_BUFFER, S.vertexBuffer);
        e.vertexAttribPointer(S.vertexLocation, 3, e.FLOAT, !1, 0, 0);
        e.enableVertexAttribArray(S.vertexLocation);
        e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
        e.blendEquation(e.FUNC_ADD);
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, S.elementBuffer);
        e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT,
            0);
        e.disable(e.STENCIL_TEST);
        e.enable(e.DEPTH_TEST);
        e.depthMask(ra)
    }

    function A(n, E) {
        var y, v, z;
        y = _sprite.attributes;
        var K = _sprite.uniforms, L = Aa / Fa, G, P = [], Y = Fa * 0.5, B = Aa * 0.5, J = !0;
        e.useProgram(_sprite.program);
        Da = _sprite.program;
        ma = -1;
        if (!db) {
            e.enableVertexAttribArray(_sprite.attributes.position);
            e.enableVertexAttribArray(_sprite.attributes.uv);
            db = !0
        }
        e.disable(e.CULL_FACE);
        e.enable(e.BLEND);
        e.depthMask(!0);
        e.bindBuffer(e.ARRAY_BUFFER, _sprite.vertexBuffer);
        e.vertexAttribPointer(y.position, 2, e.FLOAT, !1,
            16, 0);
        e.vertexAttribPointer(y.uv, 2, e.FLOAT, !1, 16, 8);
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer);
        e.uniformMatrix4fv(K.projectionMatrix, !1, Ja);
        e.activeTexture(e.TEXTURE0);
        e.uniform1i(K.map, 0);
        y = 0;
        for (v = n.__webglSprites.length; y < v; y++) {
            z = n.__webglSprites[y];
            if (z.useScreenCoordinates)z.z = -z.position.z; else {
                z._modelViewMatrix.multiplyToArray(E.matrixWorldInverse, z.matrixWorld, z._modelViewMatrixArray);
                z.z = -z._modelViewMatrix.n34
            }
        }
        n.__webglSprites.sort(w);
        y = 0;
        for (v = n.__webglSprites.length; y <
        v; y++) {
            z = n.__webglSprites[y];
            if (z.material === undefined && z.map && z.map.image && z.map.image.width) {
                if (z.useScreenCoordinates) {
                    e.uniform1i(K.useScreenCoordinates, 1);
                    e.uniform3f(K.screenPosition, (z.position.x - Y) / Y, (B - z.position.y) / B, Math.max(0, Math.min(1, z.position.z)))
                } else {
                    e.uniform1i(K.useScreenCoordinates, 0);
                    e.uniform1i(K.affectedByDistance, z.affectedByDistance ? 1 : 0);
                    e.uniformMatrix4fv(K.modelViewMatrix, !1, z._modelViewMatrixArray)
                }
                G = z.map.image.width / (z.affectedByDistance ? 1 : Aa);
                P[0] = G * L * z.scale.x;
                P[1] =
                    G * z.scale.y;
                e.uniform2f(K.uvScale, z.uvScale.x, z.uvScale.y);
                e.uniform2f(K.uvOffset, z.uvOffset.x, z.uvOffset.y);
                e.uniform2f(K.alignment, z.alignment.x, z.alignment.y);
                e.uniform1f(K.opacity, z.opacity);
                e.uniform1f(K.rotation, z.rotation);
                e.uniform2fv(K.scale, P);
                if (z.mergeWith3D && !J) {
                    e.enable(e.DEPTH_TEST);
                    J = !0
                } else if (!z.mergeWith3D && J) {
                    e.disable(e.DEPTH_TEST);
                    J = !1
                }
                V(z.blending);
                R(z.map, 0);
                e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0)
            }
        }
        e.enable(e.CULL_FACE);
        e.enable(e.DEPTH_TEST);
        e.depthMask(ra)
    }

    function I(n,
               E) {
        var y, v, z = n.__webglLensFlares.length, K, L, G, P = new THREE.Vector3, Y = Aa / Fa, B = Fa * 0.5, J = Aa * 0.5, X = 16 / Aa, ka = [X * Y, X], ha = [1, 1, 0], Ha = [1, 1], Ba = T.uniforms;
        y = T.attributes;
        e.useProgram(T.program);
        Da = T.program;
        ma = -1;
        if (!Ma) {
            e.enableVertexAttribArray(T.attributes.vertex);
            e.enableVertexAttribArray(T.attributes.uv);
            Ma = !0
        }
        e.uniform1i(Ba.occlusionMap, 0);
        e.uniform1i(Ba.map, 1);
        e.bindBuffer(e.ARRAY_BUFFER, T.vertexBuffer);
        e.vertexAttribPointer(y.vertex, 2, e.FLOAT, !1, 16, 0);
        e.vertexAttribPointer(y.uv, 2, e.FLOAT, !1, 16, 8);
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,
            T.elementBuffer);
        e.disable(e.CULL_FACE);
        e.depthMask(!1);
        e.activeTexture(e.TEXTURE0);
        e.bindTexture(e.TEXTURE_2D, T.occlusionTexture);
        e.activeTexture(e.TEXTURE1);
        for (v = 0; v < z; v++) {
            y = n.__webglLensFlares[v].object;
            P.set(y.matrixWorld.n14, y.matrixWorld.n24, y.matrixWorld.n34);
            E.matrixWorldInverse.multiplyVector3(P);
            E.projectionMatrix.multiplyVector3(P);
            ha[0] = P.x;
            ha[1] = P.y;
            ha[2] = P.z;
            Ha[0] = ha[0] * B + B;
            Ha[1] = ha[1] * J + J;
            if (T.hasVertexTexture || Ha[0] > 0 && Ha[0] < Fa && Ha[1] > 0 && Ha[1] < Aa) {
                e.bindTexture(e.TEXTURE_2D, T.tempTexture);
                e.copyTexImage2D(e.TEXTURE_2D, 0, e.RGB, Ha[0] - 8, Ha[1] - 8, 16, 16, 0);
                e.uniform1i(Ba.renderType, 0);
                e.uniform2fv(Ba.scale, ka);
                e.uniform3fv(Ba.screenPosition, ha);
                e.disable(e.BLEND);
                e.enable(e.DEPTH_TEST);
                e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0);
                e.bindTexture(e.TEXTURE_2D, T.occlusionTexture);
                e.copyTexImage2D(e.TEXTURE_2D, 0, e.RGBA, Ha[0] - 8, Ha[1] - 8, 16, 16, 0);
                e.uniform1i(Ba.renderType, 1);
                e.disable(e.DEPTH_TEST);
                e.bindTexture(e.TEXTURE_2D, T.tempTexture);
                e.drawElements(e.TRIANGLES, 6, e.UNSIGNED_SHORT, 0);
                y.positionScreen.x =
                    ha[0];
                y.positionScreen.y = ha[1];
                y.positionScreen.z = ha[2];
                y.customUpdateCallback ? y.customUpdateCallback(y) : y.updateLensFlares();
                e.uniform1i(Ba.renderType, 2);
                e.enable(e.BLEND);
                K = 0;
                for (L = y.lensFlares.length; K < L; K++) {
                    G = y.lensFlares[K];
                    if (G.opacity > 0.001 && G.scale > 0.001) {
                        ha[0] = G.x;
                        ha[1] = G.y;
                        ha[2] = G.z;
                        X = G.size * G.scale / Aa;
                        ka[0] = X * Y;
                        ka[1] = X;
                        e.uniform3fv(Ba.screenPosition, ha);
                        e.uniform2fv(Ba.scale, ka);
                        e.uniform1f(Ba.rotation, G.rotation);
                        e.uniform1f(Ba.opacity, G.opacity);
                        V(G.blending);
                        R(G.texture, 1);
                        e.drawElements(e.TRIANGLES,
                            6, e.UNSIGNED_SHORT, 0)
                    }
                }
            }
        }
        e.enable(e.CULL_FACE);
        e.enable(e.DEPTH_TEST);
        e.depthMask(ra)
    }

    function H(n, E) {
        n._modelViewMatrix.multiplyToArray(E.matrixWorldInverse, n.matrixWorld, n._modelViewMatrixArray);
        THREE.Matrix4.makeInvert3x3(n._modelViewMatrix).transposeIntoArray(n._normalMatrixArray)
    }

    function C(n) {
        var E, y, v, z, K;
        if (n instanceof THREE.Mesh) {
            y = n.geometry;
            for (E in y.geometryGroups) {
                v = y.geometryGroups[E];
                K = !1;
                for (z in v.__webglCustomAttributes)if (v.__webglCustomAttributes[z].needsUpdate) {
                    K = !0;
                    break
                }
                if (y.__dirtyVertices ||
                    y.__dirtyMorphTargets || y.__dirtyElements || y.__dirtyUvs || y.__dirtyNormals || y.__dirtyColors || y.__dirtyTangents || K) {
                    K = n;
                    var L = e.DYNAMIC_DRAW;
                    if (v.__inittedArrays) {
                        var G = void 0, P = void 0, Y = void 0, B = void 0;
                        Y = void 0;
                        var J = void 0, X = void 0, ka = void 0, ha = void 0, Ha = void 0, Ba = void 0, La = void 0, Xa = void 0, Ka = void 0, ya = void 0, Ga = void 0, Ea = void 0, Ua = void 0;
                        X = void 0;
                        ka = void 0;
                        B = void 0;
                        ha = void 0;
                        B = void 0;
                        var F = void 0, ca = void 0;
                        X = void 0;
                        F = void 0;
                        ca = void 0;
                        var x = void 0, bb = void 0;
                        F = void 0;
                        ca = void 0;
                        x = void 0;
                        bb = void 0;
                        F = void 0;
                        ca = void 0;
                        x = void 0;
                        bb = void 0;
                        F = void 0;
                        ca = void 0;
                        x = void 0;
                        B = void 0;
                        ha = void 0;
                        J = void 0;
                        Y = void 0;
                        Y = void 0;
                        F = void 0;
                        ca = void 0;
                        x = void 0;
                        var hb = void 0, Pa = 0, Sa = 0, eb = 0, jb = 0, Za = 0, ab = 0, Na = 0, cb = 0, Ya = 0, M = 0, Oa = 0;
                        ca = F = 0;
                        var Ta = v.__vertexArray, kb = v.__uvArray, lb = v.__uv2Array, Qa = v.__normalArray, Q = v.__tangentArray, qa = v.__colorArray, ia = v.__skinVertexAArray, aa = v.__skinVertexBArray, va = v.__skinIndexArray, wa = v.__skinWeightArray, Ca = v.__morphTargetsArrays, W = v.__webglCustomAttributes;
                        x = void 0;
                        var Ia = v.__faceArray, $a =
                            v.__lineArray, gb = v.__needsSmoothNormals;
                        Ba = v.__vertexColorType;
                        Ha = v.__uvType;
                        La = v.__normalType;
                        var Va = K.geometry, mb = Va.__dirtyVertices, ib = Va.__dirtyElements, fb = Va.__dirtyUvs, tb = Va.__dirtyNormals, ub = Va.__dirtyTangents, vb = Va.__dirtyColors, wb = Va.__dirtyMorphTargets, pb = Va.vertices, xb = v.faces, Ab = Va.faces, yb = Va.faceVertexUvs[0], zb = Va.faceVertexUvs[1], qb = Va.skinVerticesA, rb = Va.skinVerticesB, sb = Va.skinIndices, nb = Va.skinWeights, ob = K instanceof THREE.ShadowVolume ? Va.edgeFaces : undefined;
                        morphTargets = Va.morphTargets;
                        if (W)for (hb in W) {
                            W[hb].offset = 0;
                            W[hb].offsetSrc = 0
                        }
                        G = 0;
                        for (P = xb.length; G < P; G++) {
                            Y = xb[G];
                            B = Ab[Y];
                            yb && (Xa = yb[Y]);
                            zb && (Ka = zb[Y]);
                            Y = B.vertexNormals;
                            J = B.normal;
                            X = B.vertexColors;
                            ka = B.color;
                            ha = B.vertexTangents;
                            if (B instanceof THREE.Face3) {
                                if (mb) {
                                    ya = pb[B.a].position;
                                    Ga = pb[B.b].position;
                                    Ea = pb[B.c].position;
                                    Ta[Sa] = ya.x;
                                    Ta[Sa + 1] = ya.y;
                                    Ta[Sa + 2] = ya.z;
                                    Ta[Sa + 3] = Ga.x;
                                    Ta[Sa + 4] = Ga.y;
                                    Ta[Sa + 5] = Ga.z;
                                    Ta[Sa + 6] = Ea.x;
                                    Ta[Sa + 7] = Ea.y;
                                    Ta[Sa + 8] = Ea.z;
                                    Sa += 9
                                }
                                if (W)for (hb in W) {
                                    x = W[hb];
                                    if (x.needsUpdate) {
                                        F = x.offset;
                                        ca = x.offsetSrc;
                                        if (x.size ===
                                            1) {
                                            if (x.boundTo === undefined || x.boundTo === "vertices") {
                                                x.array[F + 0] = x.value[B.a];
                                                x.array[F + 1] = x.value[B.b];
                                                x.array[F + 2] = x.value[B.c]
                                            } else if (x.boundTo === "faces") {
                                                x.array[F + 0] = x.value[ca];
                                                x.array[F + 1] = x.value[ca];
                                                x.array[F + 2] = x.value[ca];
                                                x.offsetSrc++
                                            } else if (x.boundTo === "faceVertices") {
                                                x.array[F + 0] = x.value[ca + 0];
                                                x.array[F + 1] = x.value[ca + 1];
                                                x.array[F + 2] = x.value[ca + 2];
                                                x.offsetSrc += 3
                                            }
                                            x.offset += 3
                                        } else {
                                            if (x.boundTo === undefined || x.boundTo === "vertices") {
                                                ya = x.value[B.a];
                                                Ga = x.value[B.b];
                                                Ea = x.value[B.c]
                                            } else if (x.boundTo ===
                                                "faces") {
                                                ya = x.value[ca];
                                                Ga = x.value[ca];
                                                Ea = x.value[ca];
                                                x.offsetSrc++
                                            } else if (x.boundTo === "faceVertices") {
                                                ya = x.value[ca + 0];
                                                Ga = x.value[ca + 1];
                                                Ea = x.value[ca + 2];
                                                x.offsetSrc += 3
                                            }
                                            if (x.size === 2) {
                                                x.array[F + 0] = ya.x;
                                                x.array[F + 1] = ya.y;
                                                x.array[F + 2] = Ga.x;
                                                x.array[F + 3] = Ga.y;
                                                x.array[F + 4] = Ea.x;
                                                x.array[F + 5] = Ea.y;
                                                x.offset += 6
                                            } else if (x.size === 3) {
                                                if (x.type === "c") {
                                                    x.array[F + 0] = ya.r;
                                                    x.array[F + 1] = ya.g;
                                                    x.array[F + 2] = ya.b;
                                                    x.array[F + 3] = Ga.r;
                                                    x.array[F + 4] = Ga.g;
                                                    x.array[F + 5] = Ga.b;
                                                    x.array[F + 6] = Ea.r;
                                                    x.array[F + 7] = Ea.g;
                                                    x.array[F + 8] = Ea.b
                                                } else {
                                                    x.array[F +
                                                    0] = ya.x;
                                                    x.array[F + 1] = ya.y;
                                                    x.array[F + 2] = ya.z;
                                                    x.array[F + 3] = Ga.x;
                                                    x.array[F + 4] = Ga.y;
                                                    x.array[F + 5] = Ga.z;
                                                    x.array[F + 6] = Ea.x;
                                                    x.array[F + 7] = Ea.y;
                                                    x.array[F + 8] = Ea.z
                                                }
                                                x.offset += 9
                                            } else {
                                                x.array[F + 0] = ya.x;
                                                x.array[F + 1] = ya.y;
                                                x.array[F + 2] = ya.z;
                                                x.array[F + 3] = ya.w;
                                                x.array[F + 4] = Ga.x;
                                                x.array[F + 5] = Ga.y;
                                                x.array[F + 6] = Ga.z;
                                                x.array[F + 7] = Ga.w;
                                                x.array[F + 8] = Ea.x;
                                                x.array[F + 9] = Ea.y;
                                                x.array[F + 10] = Ea.z;
                                                x.array[F + 11] = Ea.w;
                                                x.offset += 12
                                            }
                                        }
                                    }
                                }
                                if (wb) {
                                    F = 0;
                                    for (ca = morphTargets.length; F < ca; F++) {
                                        ya = morphTargets[F].vertices[B.a].position;
                                        Ga = morphTargets[F].vertices[B.b].position;
                                        Ea = morphTargets[F].vertices[B.c].position;
                                        x = Ca[F];
                                        x[Oa + 0] = ya.x;
                                        x[Oa + 1] = ya.y;
                                        x[Oa + 2] = ya.z;
                                        x[Oa + 3] = Ga.x;
                                        x[Oa + 4] = Ga.y;
                                        x[Oa + 5] = Ga.z;
                                        x[Oa + 6] = Ea.x;
                                        x[Oa + 7] = Ea.y;
                                        x[Oa + 8] = Ea.z
                                    }
                                    Oa += 9
                                }
                                if (nb.length) {
                                    F = nb[B.a];
                                    ca = nb[B.b];
                                    x = nb[B.c];
                                    wa[M] = F.x;
                                    wa[M + 1] = F.y;
                                    wa[M + 2] = F.z;
                                    wa[M + 3] = F.w;
                                    wa[M + 4] = ca.x;
                                    wa[M + 5] = ca.y;
                                    wa[M + 6] = ca.z;
                                    wa[M + 7] = ca.w;
                                    wa[M + 8] = x.x;
                                    wa[M + 9] = x.y;
                                    wa[M + 10] = x.z;
                                    wa[M + 11] = x.w;
                                    F = sb[B.a];
                                    ca = sb[B.b];
                                    x = sb[B.c];
                                    va[M] = F.x;
                                    va[M + 1] = F.y;
                                    va[M + 2] = F.z;
                                    va[M + 3] = F.w;
                                    va[M + 4] = ca.x;
                                    va[M + 5] = ca.y;
                                    va[M + 6] = ca.z;
                                    va[M + 7] = ca.w;
                                    va[M + 8] =
                                        x.x;
                                    va[M + 9] = x.y;
                                    va[M + 10] = x.z;
                                    va[M + 11] = x.w;
                                    F = qb[B.a];
                                    ca = qb[B.b];
                                    x = qb[B.c];
                                    ia[M] = F.x;
                                    ia[M + 1] = F.y;
                                    ia[M + 2] = F.z;
                                    ia[M + 3] = 1;
                                    ia[M + 4] = ca.x;
                                    ia[M + 5] = ca.y;
                                    ia[M + 6] = ca.z;
                                    ia[M + 7] = 1;
                                    ia[M + 8] = x.x;
                                    ia[M + 9] = x.y;
                                    ia[M + 10] = x.z;
                                    ia[M + 11] = 1;
                                    F = rb[B.a];
                                    ca = rb[B.b];
                                    x = rb[B.c];
                                    aa[M] = F.x;
                                    aa[M + 1] = F.y;
                                    aa[M + 2] = F.z;
                                    aa[M + 3] = 1;
                                    aa[M + 4] = ca.x;
                                    aa[M + 5] = ca.y;
                                    aa[M + 6] = ca.z;
                                    aa[M + 7] = 1;
                                    aa[M + 8] = x.x;
                                    aa[M + 9] = x.y;
                                    aa[M + 10] = x.z;
                                    aa[M + 11] = 1;
                                    M += 12
                                }
                                if (vb && Ba) {
                                    if (X.length == 3 && Ba == THREE.VertexColors) {
                                        B = X[0];
                                        F = X[1];
                                        ca = X[2]
                                    } else ca = F = B = ka;
                                    qa[Ya] = B.r;
                                    qa[Ya + 1] = B.g;
                                    qa[Ya + 2] = B.b;
                                    qa[Ya + 3] = F.r;
                                    qa[Ya + 4] = F.g;
                                    qa[Ya + 5] = F.b;
                                    qa[Ya + 6] = ca.r;
                                    qa[Ya + 7] = ca.g;
                                    qa[Ya + 8] = ca.b;
                                    Ya += 9
                                }
                                if (ub && Va.hasTangents) {
                                    X = ha[0];
                                    ka = ha[1];
                                    B = ha[2];
                                    Q[Na] = X.x;
                                    Q[Na + 1] = X.y;
                                    Q[Na + 2] = X.z;
                                    Q[Na + 3] = X.w;
                                    Q[Na + 4] = ka.x;
                                    Q[Na + 5] = ka.y;
                                    Q[Na + 6] = ka.z;
                                    Q[Na + 7] = ka.w;
                                    Q[Na + 8] = B.x;
                                    Q[Na + 9] = B.y;
                                    Q[Na + 10] = B.z;
                                    Q[Na + 11] = B.w;
                                    Na += 12
                                }
                                if (tb && La)if (Y.length == 3 && gb)for (ha = 0; ha < 3; ha++) {
                                    J = Y[ha];
                                    Qa[ab] = J.x;
                                    Qa[ab + 1] = J.y;
                                    Qa[ab + 2] = J.z;
                                    ab += 3
                                } else for (ha = 0; ha < 3; ha++) {
                                    Qa[ab] = J.x;
                                    Qa[ab + 1] = J.y;
                                    Qa[ab + 2] = J.z;
                                    ab += 3
                                }
                                if (fb && Xa !== undefined && Ha)for (ha =
                                                                          0; ha < 3; ha++) {
                                    Y = Xa[ha];
                                    kb[eb] = Y.u;
                                    kb[eb + 1] = Y.v;
                                    eb += 2
                                }
                                if (fb && Ka !== undefined && Ha)for (ha = 0; ha < 3; ha++) {
                                    Y = Ka[ha];
                                    lb[jb] = Y.u;
                                    lb[jb + 1] = Y.v;
                                    jb += 2
                                }
                                if (ib) {
                                    Ia[Za] = Pa;
                                    Ia[Za + 1] = Pa + 1;
                                    Ia[Za + 2] = Pa + 2;
                                    Za += 3;
                                    $a[cb] = Pa;
                                    $a[cb + 1] = Pa + 1;
                                    $a[cb + 2] = Pa;
                                    $a[cb + 3] = Pa + 2;
                                    $a[cb + 4] = Pa + 1;
                                    $a[cb + 5] = Pa + 2;
                                    cb += 6;
                                    Pa += 3
                                }
                            } else if (B instanceof THREE.Face4) {
                                if (mb) {
                                    ya = pb[B.a].position;
                                    Ga = pb[B.b].position;
                                    Ea = pb[B.c].position;
                                    Ua = pb[B.d].position;
                                    Ta[Sa] = ya.x;
                                    Ta[Sa + 1] = ya.y;
                                    Ta[Sa + 2] = ya.z;
                                    Ta[Sa + 3] = Ga.x;
                                    Ta[Sa + 4] = Ga.y;
                                    Ta[Sa + 5] = Ga.z;
                                    Ta[Sa + 6] = Ea.x;
                                    Ta[Sa +
                                    7] = Ea.y;
                                    Ta[Sa + 8] = Ea.z;
                                    Ta[Sa + 9] = Ua.x;
                                    Ta[Sa + 10] = Ua.y;
                                    Ta[Sa + 11] = Ua.z;
                                    Sa += 12
                                }
                                if (W)for (hb in W) {
                                    x = W[hb];
                                    if (x.needsUpdate) {
                                        F = x.offset;
                                        ca = x.offsetSrc;
                                        if (x.size === 1) {
                                            if (x.boundTo === undefined || x.boundTo === "vertices") {
                                                x.array[F + 0] = x.value[B.a];
                                                x.array[F + 1] = x.value[B.b];
                                                x.array[F + 2] = x.value[B.c];
                                                x.array[F + 3] = x.value[B.d]
                                            } else if (x.boundTo === "faces") {
                                                x.array[F + 0] = x.value[ca];
                                                x.array[F + 1] = x.value[ca];
                                                x.array[F + 2] = x.value[ca];
                                                x.array[F + 3] = x.value[ca];
                                                x.offsetSrc++
                                            } else if (x.boundTo === "faceVertices") {
                                                x.array[F +
                                                0] = x.value[ca + 0];
                                                x.array[F + 1] = x.value[ca + 1];
                                                x.array[F + 2] = x.value[ca + 2];
                                                x.array[F + 3] = x.value[ca + 3];
                                                x.offsetSrc += 4
                                            }
                                            x.offset += 4
                                        } else {
                                            if (x.boundTo === undefined || x.boundTo === "vertices") {
                                                ya = x.value[B.a];
                                                Ga = x.value[B.b];
                                                Ea = x.value[B.c];
                                                Ua = x.value[B.d]
                                            } else if (x.boundTo === "faces") {
                                                ya = x.value[ca];
                                                Ga = x.value[ca];
                                                Ea = x.value[ca];
                                                Ua = x.value[ca];
                                                x.offsetSrc++
                                            } else if (x.boundTo === "faceVertices") {
                                                ya = x.value[ca + 0];
                                                Ga = x.value[ca + 1];
                                                Ea = x.value[ca + 2];
                                                Ua = x.value[ca + 3];
                                                x.offsetSrc += 4
                                            }
                                            if (x.size === 2) {
                                                x.array[F + 0] = ya.x;
                                                x.array[F +
                                                1] = ya.y;
                                                x.array[F + 2] = Ga.x;
                                                x.array[F + 3] = Ga.y;
                                                x.array[F + 4] = Ea.x;
                                                x.array[F + 5] = Ea.y;
                                                x.array[F + 6] = Ua.x;
                                                x.array[F + 7] = Ua.y;
                                                x.offset += 8
                                            } else if (x.size === 3) {
                                                if (x.type === "c") {
                                                    x.array[F + 0] = ya.r;
                                                    x.array[F + 1] = ya.g;
                                                    x.array[F + 2] = ya.b;
                                                    x.array[F + 3] = Ga.r;
                                                    x.array[F + 4] = Ga.g;
                                                    x.array[F + 5] = Ga.b;
                                                    x.array[F + 6] = Ea.r;
                                                    x.array[F + 7] = Ea.g;
                                                    x.array[F + 8] = Ea.b;
                                                    x.array[F + 9] = Ua.r;
                                                    x.array[F + 10] = Ua.g;
                                                    x.array[F + 11] = Ua.b
                                                } else {
                                                    x.array[F + 0] = ya.x;
                                                    x.array[F + 1] = ya.y;
                                                    x.array[F + 2] = ya.z;
                                                    x.array[F + 3] = Ga.x;
                                                    x.array[F + 4] = Ga.y;
                                                    x.array[F + 5] = Ga.z;
                                                    x.array[F +
                                                    6] = Ea.x;
                                                    x.array[F + 7] = Ea.y;
                                                    x.array[F + 8] = Ea.z;
                                                    x.array[F + 9] = Ua.x;
                                                    x.array[F + 10] = Ua.y;
                                                    x.array[F + 11] = Ua.z
                                                }
                                                x.offset += 12
                                            } else {
                                                x.array[F + 0] = ya.x;
                                                x.array[F + 1] = ya.y;
                                                x.array[F + 2] = ya.z;
                                                x.array[F + 3] = ya.w;
                                                x.array[F + 4] = Ga.x;
                                                x.array[F + 5] = Ga.y;
                                                x.array[F + 6] = Ga.z;
                                                x.array[F + 7] = Ga.w;
                                                x.array[F + 8] = Ea.x;
                                                x.array[F + 9] = Ea.y;
                                                x.array[F + 10] = Ea.z;
                                                x.array[F + 11] = Ea.w;
                                                x.array[F + 12] = Ua.x;
                                                x.array[F + 13] = Ua.y;
                                                x.array[F + 14] = Ua.z;
                                                x.array[F + 15] = Ua.w;
                                                x.offset += 16
                                            }
                                        }
                                    }
                                }
                                if (wb) {
                                    F = 0;
                                    for (ca = morphTargets.length; F < ca; F++) {
                                        ya = morphTargets[F].vertices[B.a].position;
                                        Ga = morphTargets[F].vertices[B.b].position;
                                        Ea = morphTargets[F].vertices[B.c].position;
                                        Ua = morphTargets[F].vertices[B.d].position;
                                        x = Ca[F];
                                        x[Oa + 0] = ya.x;
                                        x[Oa + 1] = ya.y;
                                        x[Oa + 2] = ya.z;
                                        x[Oa + 3] = Ga.x;
                                        x[Oa + 4] = Ga.y;
                                        x[Oa + 5] = Ga.z;
                                        x[Oa + 6] = Ea.x;
                                        x[Oa + 7] = Ea.y;
                                        x[Oa + 8] = Ea.z;
                                        x[Oa + 9] = Ua.x;
                                        x[Oa + 10] = Ua.y;
                                        x[Oa + 11] = Ua.z
                                    }
                                    Oa += 12
                                }
                                if (nb.length) {
                                    F = nb[B.a];
                                    ca = nb[B.b];
                                    x = nb[B.c];
                                    bb = nb[B.d];
                                    wa[M] = F.x;
                                    wa[M + 1] = F.y;
                                    wa[M + 2] = F.z;
                                    wa[M + 3] = F.w;
                                    wa[M + 4] = ca.x;
                                    wa[M + 5] = ca.y;
                                    wa[M + 6] = ca.z;
                                    wa[M + 7] = ca.w;
                                    wa[M + 8] = x.x;
                                    wa[M + 9] = x.y;
                                    wa[M + 10] = x.z;
                                    wa[M + 11] = x.w;
                                    wa[M + 12] = bb.x;
                                    wa[M + 13] = bb.y;
                                    wa[M + 14] = bb.z;
                                    wa[M + 15] = bb.w;
                                    F = sb[B.a];
                                    ca = sb[B.b];
                                    x = sb[B.c];
                                    bb = sb[B.d];
                                    va[M] = F.x;
                                    va[M + 1] = F.y;
                                    va[M + 2] = F.z;
                                    va[M + 3] = F.w;
                                    va[M + 4] = ca.x;
                                    va[M + 5] = ca.y;
                                    va[M + 6] = ca.z;
                                    va[M + 7] = ca.w;
                                    va[M + 8] = x.x;
                                    va[M + 9] = x.y;
                                    va[M + 10] = x.z;
                                    va[M + 11] = x.w;
                                    va[M + 12] = bb.x;
                                    va[M + 13] = bb.y;
                                    va[M + 14] = bb.z;
                                    va[M + 15] = bb.w;
                                    F = qb[B.a];
                                    ca = qb[B.b];
                                    x = qb[B.c];
                                    bb = qb[B.d];
                                    ia[M] = F.x;
                                    ia[M + 1] = F.y;
                                    ia[M + 2] = F.z;
                                    ia[M + 3] = 1;
                                    ia[M + 4] = ca.x;
                                    ia[M + 5] = ca.y;
                                    ia[M + 6] = ca.z;
                                    ia[M + 7] = 1;
                                    ia[M + 8] = x.x;
                                    ia[M + 9] = x.y;
                                    ia[M + 10] = x.z;
                                    ia[M + 11] = 1;
                                    ia[M + 12] = bb.x;
                                    ia[M +
                                    13] = bb.y;
                                    ia[M + 14] = bb.z;
                                    ia[M + 15] = 1;
                                    F = rb[B.a];
                                    ca = rb[B.b];
                                    x = rb[B.c];
                                    B = rb[B.d];
                                    aa[M] = F.x;
                                    aa[M + 1] = F.y;
                                    aa[M + 2] = F.z;
                                    aa[M + 3] = 1;
                                    aa[M + 4] = ca.x;
                                    aa[M + 5] = ca.y;
                                    aa[M + 6] = ca.z;
                                    aa[M + 7] = 1;
                                    aa[M + 8] = x.x;
                                    aa[M + 9] = x.y;
                                    aa[M + 10] = x.z;
                                    aa[M + 11] = 1;
                                    aa[M + 12] = B.x;
                                    aa[M + 13] = B.y;
                                    aa[M + 14] = B.z;
                                    aa[M + 15] = 1;
                                    M += 16
                                }
                                if (vb && Ba) {
                                    if (X.length == 4 && Ba == THREE.VertexColors) {
                                        B = X[0];
                                        F = X[1];
                                        ca = X[2];
                                        X = X[3]
                                    } else X = ca = F = B = ka;
                                    qa[Ya] = B.r;
                                    qa[Ya + 1] = B.g;
                                    qa[Ya + 2] = B.b;
                                    qa[Ya + 3] = F.r;
                                    qa[Ya + 4] = F.g;
                                    qa[Ya + 5] = F.b;
                                    qa[Ya + 6] = ca.r;
                                    qa[Ya + 7] = ca.g;
                                    qa[Ya + 8] = ca.b;
                                    qa[Ya + 9] = X.r;
                                    qa[Ya +
                                    10] = X.g;
                                    qa[Ya + 11] = X.b;
                                    Ya += 12
                                }
                                if (ub && Va.hasTangents) {
                                    X = ha[0];
                                    ka = ha[1];
                                    B = ha[2];
                                    ha = ha[3];
                                    Q[Na] = X.x;
                                    Q[Na + 1] = X.y;
                                    Q[Na + 2] = X.z;
                                    Q[Na + 3] = X.w;
                                    Q[Na + 4] = ka.x;
                                    Q[Na + 5] = ka.y;
                                    Q[Na + 6] = ka.z;
                                    Q[Na + 7] = ka.w;
                                    Q[Na + 8] = B.x;
                                    Q[Na + 9] = B.y;
                                    Q[Na + 10] = B.z;
                                    Q[Na + 11] = B.w;
                                    Q[Na + 12] = ha.x;
                                    Q[Na + 13] = ha.y;
                                    Q[Na + 14] = ha.z;
                                    Q[Na + 15] = ha.w;
                                    Na += 16
                                }
                                if (tb && La)if (Y.length == 4 && gb)for (ha = 0; ha < 4; ha++) {
                                    J = Y[ha];
                                    Qa[ab] = J.x;
                                    Qa[ab + 1] = J.y;
                                    Qa[ab + 2] = J.z;
                                    ab += 3
                                } else for (ha = 0; ha < 4; ha++) {
                                    Qa[ab] = J.x;
                                    Qa[ab + 1] = J.y;
                                    Qa[ab + 2] = J.z;
                                    ab += 3
                                }
                                if (fb && Xa !== undefined && Ha)for (ha = 0; ha <
                                4; ha++) {
                                    Y = Xa[ha];
                                    kb[eb] = Y.u;
                                    kb[eb + 1] = Y.v;
                                    eb += 2
                                }
                                if (fb && Ka !== undefined && Ha)for (ha = 0; ha < 4; ha++) {
                                    Y = Ka[ha];
                                    lb[jb] = Y.u;
                                    lb[jb + 1] = Y.v;
                                    jb += 2
                                }
                                if (ib) {
                                    Ia[Za] = Pa;
                                    Ia[Za + 1] = Pa + 1;
                                    Ia[Za + 2] = Pa + 3;
                                    Ia[Za + 3] = Pa + 1;
                                    Ia[Za + 4] = Pa + 2;
                                    Ia[Za + 5] = Pa + 3;
                                    Za += 6;
                                    $a[cb] = Pa;
                                    $a[cb + 1] = Pa + 1;
                                    $a[cb + 2] = Pa;
                                    $a[cb + 3] = Pa + 3;
                                    $a[cb + 4] = Pa + 1;
                                    $a[cb + 5] = Pa + 2;
                                    $a[cb + 6] = Pa + 2;
                                    $a[cb + 7] = Pa + 3;
                                    cb += 8;
                                    Pa += 4
                                }
                            }
                        }
                        if (ob) {
                            G = 0;
                            for (P = ob.length; G < P; G++) {
                                Ia[Za] = ob[G].a;
                                Ia[Za + 1] = ob[G].b;
                                Ia[Za + 2] = ob[G].c;
                                Ia[Za + 3] = ob[G].a;
                                Ia[Za + 4] = ob[G].c;
                                Ia[Za + 5] = ob[G].d;
                                Za += 6
                            }
                        }
                        if (mb) {
                            e.bindBuffer(e.ARRAY_BUFFER,
                                v.__webglVertexBuffer);
                            e.bufferData(e.ARRAY_BUFFER, Ta, L)
                        }
                        if (W)for (hb in W) {
                            x = W[hb];
                            if (x.needsUpdate) {
                                e.bindBuffer(e.ARRAY_BUFFER, x.buffer);
                                e.bufferData(e.ARRAY_BUFFER, x.array, L);
                                x.needsUpdate = !1
                            }
                        }
                        if (wb) {
                            F = 0;
                            for (ca = morphTargets.length; F < ca; F++) {
                                e.bindBuffer(e.ARRAY_BUFFER, v.__webglMorphTargetsBuffers[F]);
                                e.bufferData(e.ARRAY_BUFFER, Ca[F], L)
                            }
                        }
                        if (vb && Ya > 0) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglColorBuffer);
                            e.bufferData(e.ARRAY_BUFFER, qa, L)
                        }
                        if (tb) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglNormalBuffer);
                            e.bufferData(e.ARRAY_BUFFER,
                                Qa, L)
                        }
                        if (ub && Va.hasTangents) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglTangentBuffer);
                            e.bufferData(e.ARRAY_BUFFER, Q, L)
                        }
                        if (fb && eb > 0) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglUVBuffer);
                            e.bufferData(e.ARRAY_BUFFER, kb, L)
                        }
                        if (fb && jb > 0) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglUV2Buffer);
                            e.bufferData(e.ARRAY_BUFFER, lb, L)
                        }
                        if (ib) {
                            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, v.__webglFaceBuffer);
                            e.bufferData(e.ELEMENT_ARRAY_BUFFER, Ia, L);
                            e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, v.__webglLineBuffer);
                            e.bufferData(e.ELEMENT_ARRAY_BUFFER,
                                $a, L)
                        }
                        if (M > 0) {
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglSkinVertexABuffer);
                            e.bufferData(e.ARRAY_BUFFER, ia, L);
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglSkinVertexBBuffer);
                            e.bufferData(e.ARRAY_BUFFER, aa, L);
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglSkinIndicesBuffer);
                            e.bufferData(e.ARRAY_BUFFER, va, L);
                            e.bindBuffer(e.ARRAY_BUFFER, v.__webglSkinWeightsBuffer);
                            e.bufferData(e.ARRAY_BUFFER, wa, L)
                        }
                        if (!K.dynamic) {
                            delete v.__inittedArrays;
                            delete v.__colorArray;
                            delete v.__normalArray;
                            delete v.__tangentArray;
                            delete v.__uvArray;
                            delete v.__uv2Array;
                            delete v.__faceArray;
                            delete v.__vertexArray;
                            delete v.__lineArray;
                            delete v.__skinVertexAArray;
                            delete v.__skinVertexBArray;
                            delete v.__skinIndexArray;
                            delete v.__skinWeightArray
                        }
                    }
                }
            }
            y.__dirtyVertices = !1;
            y.__dirtyMorphTargets = !1;
            y.__dirtyElements = !1;
            y.__dirtyUvs = !1;
            y.__dirtyNormals = !1;
            y.__dirtyTangents = !1;
            y.__dirtyColors = !1
        } else if (n instanceof THREE.Ribbon) {
            y = n.geometry;
            if (y.__dirtyVertices || y.__dirtyColors) {
                n = y;
                E = e.DYNAMIC_DRAW;
                Ha = n.vertices;
                v = n.colors;
                Ba = Ha.length;
                K = v.length;
                La = n.__vertexArray;
                L = n.__colorArray;
                Xa = n.__dirtyColors;
                if (n.__dirtyVertices) {
                    for (G = 0; G < Ba; G++) {
                        P = Ha[G].position;
                        z = G * 3;
                        La[z] = P.x;
                        La[z + 1] = P.y;
                        La[z + 2] = P.z
                    }
                    e.bindBuffer(e.ARRAY_BUFFER, n.__webglVertexBuffer);
                    e.bufferData(e.ARRAY_BUFFER, La, E)
                }
                if (Xa) {
                    for (G = 0; G < K; G++) {
                        color = v[G];
                        z = G * 3;
                        L[z] = color.r;
                        L[z + 1] = color.g;
                        L[z + 2] = color.b
                    }
                    e.bindBuffer(e.ARRAY_BUFFER, n.__webglColorBuffer);
                    e.bufferData(e.ARRAY_BUFFER, L, E)
                }
            }
            y.__dirtyVertices = !1;
            y.__dirtyColors = !1
        } else if (n instanceof THREE.Line) {
            y = n.geometry;
            if (y.__dirtyVertices || y.__dirtyColors) {
                n =
                    y;
                E = e.DYNAMIC_DRAW;
                Ha = n.vertices;
                v = n.colors;
                Ba = Ha.length;
                K = v.length;
                La = n.__vertexArray;
                L = n.__colorArray;
                Xa = n.__dirtyColors;
                if (n.__dirtyVertices) {
                    for (G = 0; G < Ba; G++) {
                        P = Ha[G].position;
                        z = G * 3;
                        La[z] = P.x;
                        La[z + 1] = P.y;
                        La[z + 2] = P.z
                    }
                    e.bindBuffer(e.ARRAY_BUFFER, n.__webglVertexBuffer);
                    e.bufferData(e.ARRAY_BUFFER, La, E)
                }
                if (Xa) {
                    for (G = 0; G < K; G++) {
                        color = v[G];
                        z = G * 3;
                        L[z] = color.r;
                        L[z + 1] = color.g;
                        L[z + 2] = color.b
                    }
                    e.bindBuffer(e.ARRAY_BUFFER, n.__webglColorBuffer);
                    e.bufferData(e.ARRAY_BUFFER, L, E)
                }
            }
            y.__dirtyVertices = !1;
            y.__dirtyColors = !1
        } else if (n instanceof THREE.ParticleSystem) {
            y = n.geometry;
            (y.__dirtyVertices || y.__dirtyColors || n.sortParticles) && d(y, e.DYNAMIC_DRAW, n);
            y.__dirtyVertices = !1;
            y.__dirtyColors = !1
        }
    }

    function U(n) {
        function E(X) {
            var ka = [];
            y = 0;
            for (v = X.length; y < v; y++)X[y] == undefined ? ka.push("undefined") : ka.push(X[y].id);
            return ka.join("_")
        }

        var y, v, z, K, L, G, P, Y, B = {}, J = n.morphTargets !== undefined ? n.morphTargets.length : 0;
        n.geometryGroups = {};
        z = 0;
        for (K = n.faces.length; z < K; z++) {
            L = n.faces[z];
            G = L.materials;
            P = E(G);
            B[P] == undefined && (B[P] =
            {hash: P, counter: 0});
            Y = B[P].hash + "_" + B[P].counter;
            n.geometryGroups[Y] == undefined && (n.geometryGroups[Y] = {
                faces: [],
                materials: G,
                vertices: 0,
                numMorphTargets: J
            });
            L = L instanceof THREE.Face3 ? 3 : 4;
            if (n.geometryGroups[Y].vertices + L > 65535) {
                B[P].counter += 1;
                Y = B[P].hash + "_" + B[P].counter;
                n.geometryGroups[Y] == undefined && (n.geometryGroups[Y] = {
                    faces: [],
                    materials: G,
                    vertices: 0,
                    numMorphTargets: J
                })
            }
            n.geometryGroups[Y].faces.push(z);
            n.geometryGroups[Y].vertices += L
        }
    }

    function D(n, E, y) {
        n.push({
            buffer: E, object: y, opaque: {
                list: [],
                count: 0
            }, transparent: {list: [], count: 0}
        })
    }

    function V(n) {
        if (n != ma) {
            switch (n) {
                case THREE.AdditiveBlending:
                    e.blendEquation(e.FUNC_ADD);
                    e.blendFunc(e.SRC_ALPHA, e.ONE);
                    break;
                case THREE.SubtractiveBlending:
                    e.blendEquation(e.FUNC_ADD);
                    e.blendFunc(e.ZERO, e.ONE_MINUS_SRC_COLOR);
                    break;
                case THREE.MultiplyBlending:
                    e.blendEquation(e.FUNC_ADD);
                    e.blendFunc(e.ZERO, e.SRC_COLOR);
                    break;
                default:
                    e.blendEquationSeparate(e.FUNC_ADD, e.FUNC_ADD);
                    e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA)
            }
            ma =
                n
        }
    }

    function O(n, E, y) {
        if ((y.width & y.width - 1) == 0 && (y.height & y.height - 1) == 0) {
            e.texParameteri(n, e.TEXTURE_WRAP_S, $(E.wrapS));
            e.texParameteri(n, e.TEXTURE_WRAP_T, $(E.wrapT));
            e.texParameteri(n, e.TEXTURE_MAG_FILTER, $(E.magFilter));
            e.texParameteri(n, e.TEXTURE_MIN_FILTER, $(E.minFilter));
            e.generateMipmap(n)
        } else {
            e.texParameteri(n, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
            e.texParameteri(n, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
            e.texParameteri(n, e.TEXTURE_MAG_FILTER, oa(E.magFilter));
            e.texParameteri(n, e.TEXTURE_MIN_FILTER,
                oa(E.minFilter))
        }
    }

    function R(n, E) {
        if (n.needsUpdate) {
            if (n.__webglInit) {
                e.bindTexture(e.TEXTURE_2D, n.__webglTexture);
                e.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, e.RGBA, e.UNSIGNED_BYTE, n.image)
            } else {
                n.__webglTexture = e.createTexture();
                e.bindTexture(e.TEXTURE_2D, n.__webglTexture);
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, n.image);
                n.__webglInit = !0
            }
            O(e.TEXTURE_2D, n, n.image);
            e.bindTexture(e.TEXTURE_2D, null);
            n.needsUpdate = !1
        }
        e.activeTexture(e.TEXTURE0 + E);
        e.bindTexture(e.TEXTURE_2D, n.__webglTexture)
    }

    function la(n) {
        if (n && !n.__webglFramebuffer) {
            if (n.depthBuffer === undefined)n.depthBuffer = !0;
            if (n.stencilBuffer === undefined)n.stencilBuffer = !0;
            n.__webglFramebuffer = e.createFramebuffer();
            n.__webglRenderbuffer = e.createRenderbuffer();
            n.__webglTexture = e.createTexture();
            e.bindTexture(e.TEXTURE_2D, n.__webglTexture);
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, $(n.wrapS));
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, $(n.wrapT));
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, $(n.magFilter));
            e.texParameteri(e.TEXTURE_2D,
                e.TEXTURE_MIN_FILTER, $(n.minFilter));
            e.texImage2D(e.TEXTURE_2D, 0, $(n.format), n.width, n.height, 0, $(n.format), $(n.type), null);
            e.bindRenderbuffer(e.RENDERBUFFER, n.__webglRenderbuffer);
            e.bindFramebuffer(e.FRAMEBUFFER, n.__webglFramebuffer);
            e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n.__webglTexture, 0);
            if (n.depthBuffer && !n.stencilBuffer) {
                e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_COMPONENT16, n.width, n.height);
                e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_ATTACHMENT, e.RENDERBUFFER,
                    n.__webglRenderbuffer)
            } else if (n.depthBuffer && n.stencilBuffer) {
                e.renderbufferStorage(e.RENDERBUFFER, e.DEPTH_STENCIL, n.width, n.height);
                e.framebufferRenderbuffer(e.FRAMEBUFFER, e.DEPTH_STENCIL_ATTACHMENT, e.RENDERBUFFER, n.__webglRenderbuffer)
            } else e.renderbufferStorage(e.RENDERBUFFER, e.RGBA4, n.width, n.height);
            e.bindTexture(e.TEXTURE_2D, null);
            e.bindRenderbuffer(e.RENDERBUFFER, null);
            e.bindFramebuffer(e.FRAMEBUFFER, null)
        }
        var E, y;
        if (n) {
            E = n.__webglFramebuffer;
            y = n.width;
            n = n.height
        } else {
            E = null;
            y = Fa;
            n = Aa
        }
        if (E !=
            fa) {
            e.bindFramebuffer(e.FRAMEBUFFER, E);
            e.viewport(pa, ja, y, n);
            fa = E
        }
    }

    function da(n, E) {
        var y;
        if (n == "fragment")y = e.createShader(e.FRAGMENT_SHADER); else n == "vertex" && (y = e.createShader(e.VERTEX_SHADER));
        e.shaderSource(y, E);
        e.compileShader(y);
        if (!e.getShaderParameter(y, e.COMPILE_STATUS)) {
            console.error(e.getShaderInfoLog(y));
            console.error(E);
            return null
        }
        return y
    }

    function oa(n) {
        switch (n) {
            case THREE.NearestFilter:
            case THREE.NearestMipMapNearestFilter:
            case THREE.NearestMipMapLinearFilter:
                return e.NEAREST;
            default:
                return e.LINEAR
        }
    }

    function $(n) {
        switch (n) {
            case THREE.RepeatWrapping:
                return e.REPEAT;
            case THREE.ClampToEdgeWrapping:
                return e.CLAMP_TO_EDGE;
            case THREE.MirroredRepeatWrapping:
                return e.MIRRORED_REPEAT;
            case THREE.NearestFilter:
                return e.NEAREST;
            case THREE.NearestMipMapNearestFilter:
                return e.NEAREST_MIPMAP_NEAREST;
            case THREE.NearestMipMapLinearFilter:
                return e.NEAREST_MIPMAP_LINEAR;
            case THREE.LinearFilter:
                return e.LINEAR;
            case THREE.LinearMipMapNearestFilter:
                return e.LINEAR_MIPMAP_NEAREST;
            case THREE.LinearMipMapLinearFilter:
                return e.LINEAR_MIPMAP_LINEAR;
            case THREE.ByteType:
                return e.BYTE;
            case THREE.UnsignedByteType:
                return e.UNSIGNED_BYTE;
            case THREE.ShortType:
                return e.SHORT;
            case THREE.UnsignedShortType:
                return e.UNSIGNED_SHORT;
            case THREE.IntType:
                return e.INT;
            case THREE.UnsignedShortType:
                return e.UNSIGNED_INT;
            case THREE.FloatType:
                return e.FLOAT;
            case THREE.AlphaFormat:
                return e.ALPHA;
            case THREE.RGBFormat:
                return e.RGB;
            case THREE.RGBAFormat:
                return e.RGBA;
            case THREE.LuminanceFormat:
                return e.LUMINANCE;
            case THREE.LuminanceAlphaFormat:
                return e.LUMINANCE_ALPHA
        }
        return 0
    }

    var na = this, e, xa = document.createElement("canvas"), sa = [], Da = null, fa = null, ra = !0, ea = null, za = null, ma = null, ta = null, pa = 0, ja = 0, Fa = 0, Aa = 0, ga = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], ua = new THREE.Matrix4, Ja = new Float32Array(16), Ra = new Float32Array(16), Wa = new THREE.Vector4, N = {
        ambient: [0, 0, 0],
        directional: {length: 0, colors: [], positions: []},
        point: {length: 0, colors: [], positions: [], distances: []}
    };
    b = b || {};
    stencil = b.stencil !== undefined ? b.stencil : !0;
    antialias = b.antialias !== undefined ? b.antialias : !1;
    clearColor = b.clearColor !== undefined ? new THREE.Color(b.clearColor) : new THREE.Color(0);
    clearAlpha = b.clearAlpha !== undefined ? b.clearAlpha : 0;
    this.data = {vertices: 0, faces: 0, drawCalls: 0};
    this.maxMorphTargets = 8;
    this.domElement = xa;
    this.autoClear = !0;
    this.sortObjects = !0;
    (function (n, E, y, v) {
        try {
            if (!(e = xa.getContext("experimental-webgl", {
                    antialias: n,
                    stencil: v
                })))throw"Error creating WebGL context.";
        } catch (z) {
            console.error(z)
        }
        console.log(navigator.userAgent + " | " +
            e.getParameter(e.VERSION) + " | " + e.getParameter(e.VENDOR) + " | " + e.getParameter(e.RENDERER) + " | " + e.getParameter(e.SHADING_LANGUAGE_VERSION));
        e.clearColor(0, 0, 0, 1);
        e.clearDepth(1);
        e.enable(e.DEPTH_TEST);
        e.depthFunc(e.LEQUAL);
        e.frontFace(e.CCW);
        e.cullFace(e.BACK);
        e.enable(e.CULL_FACE);
        e.enable(e.BLEND);
        e.blendEquation(e.FUNC_ADD);
        e.blendFunc(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA);
        e.clearColor(E.r, E.g, E.b, y)
    })(antialias, clearColor, clearAlpha, stencil);
    this.context = e;
    var Z = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS) >
        0;
    if (stencil) {
        var S = {};
        S.vertices = new Float32Array(12);
        S.faces = new Uint16Array(6);
        S.darkness = 0.5;
        S.vertices[0] = -20;
        S.vertices[1] = -20;
        S.vertices[2] = -1;
        S.vertices[3] = 20;
        S.vertices[4] = -20;
        S.vertices[5] = -1;
        S.vertices[6] = 20;
        S.vertices[7] = 20;
        S.vertices[8] = -1;
        S.vertices[9] = -20;
        S.vertices[10] = 20;
        S.vertices[11] = -1;
        S.faces[0] = 0;
        S.faces[1] = 1;
        S.faces[2] = 2;
        S.faces[3] = 0;
        S.faces[4] = 2;
        S.faces[5] = 3;
        S.vertexBuffer = e.createBuffer();
        S.elementBuffer = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, S.vertexBuffer);
        e.bufferData(e.ARRAY_BUFFER,
            S.vertices, e.STATIC_DRAW);
        e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, S.elementBuffer);
        e.bufferData(e.ELEMENT_ARRAY_BUFFER, S.faces, e.STATIC_DRAW);
        S.program = e.createProgram();
        e.attachShader(S.program, da("fragment", THREE.ShaderLib.shadowPost.fragmentShader));
        e.attachShader(S.program, da("vertex", THREE.ShaderLib.shadowPost.vertexShader));
        e.linkProgram(S.program);
        S.vertexLocation = e.getAttribLocation(S.program, "position");
        S.projectionLocation = e.getUniformLocation(S.program, "projectionMatrix");
        S.darknessLocation =
            e.getUniformLocation(S.program, "darkness")
    }
    var T = {};
    T.vertices = new Float32Array(16);
    T.faces = new Uint16Array(6);
    b = 0;
    T.vertices[b++] = -1;
    T.vertices[b++] = -1;
    T.vertices[b++] = 0;
    T.vertices[b++] = 0;
    T.vertices[b++] = 1;
    T.vertices[b++] = -1;
    T.vertices[b++] = 1;
    T.vertices[b++] = 0;
    T.vertices[b++] = 1;
    T.vertices[b++] = 1;
    T.vertices[b++] = 1;
    T.vertices[b++] = 1;
    T.vertices[b++] = -1;
    T.vertices[b++] = 1;
    T.vertices[b++] = 0;
    T.vertices[b++] = 1;
    b = 0;
    T.faces[b++] = 0;
    T.faces[b++] = 1;
    T.faces[b++] = 2;
    T.faces[b++] = 0;
    T.faces[b++] = 2;
    T.faces[b++] = 3;
    T.vertexBuffer = e.createBuffer();
    T.elementBuffer = e.createBuffer();
    T.tempTexture = e.createTexture();
    T.occlusionTexture = e.createTexture();
    e.bindBuffer(e.ARRAY_BUFFER, T.vertexBuffer);
    e.bufferData(e.ARRAY_BUFFER, T.vertices, e.STATIC_DRAW);
    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, T.elementBuffer);
    e.bufferData(e.ELEMENT_ARRAY_BUFFER, T.faces, e.STATIC_DRAW);
    e.bindTexture(e.TEXTURE_2D, T.tempTexture);
    e.texImage2D(e.TEXTURE_2D, 0, e.RGB, 16, 16, 0, e.RGB, e.UNSIGNED_BYTE, null);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S,
        e.CLAMP_TO_EDGE);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST);
    e.bindTexture(e.TEXTURE_2D, T.occlusionTexture);
    e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, 16, 16, 0, e.RGBA, e.UNSIGNED_BYTE, null);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST);
    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST);
    if (e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0) {
        T.hasVertexTexture = !1;
        T.program = e.createProgram();
        e.attachShader(T.program, da("fragment", THREE.ShaderLib.lensFlare.fragmentShader));
        e.attachShader(T.program, da("vertex", THREE.ShaderLib.lensFlare.vertexShader))
    } else {
        T.hasVertexTexture = !0;
        T.program = e.createProgram();
        e.attachShader(T.program, da("fragment", THREE.ShaderLib.lensFlareVertexTexture.fragmentShader));
        e.attachShader(T.program,
            da("vertex", THREE.ShaderLib.lensFlareVertexTexture.vertexShader))
    }
    e.linkProgram(T.program);
    T.attributes = {};
    T.uniforms = {};
    T.attributes.vertex = e.getAttribLocation(T.program, "position");
    T.attributes.uv = e.getAttribLocation(T.program, "UV");
    T.uniforms.renderType = e.getUniformLocation(T.program, "renderType");
    T.uniforms.map = e.getUniformLocation(T.program, "map");
    T.uniforms.occlusionMap = e.getUniformLocation(T.program, "occlusionMap");
    T.uniforms.opacity = e.getUniformLocation(T.program, "opacity");
    T.uniforms.scale =
        e.getUniformLocation(T.program, "scale");
    T.uniforms.rotation = e.getUniformLocation(T.program, "rotation");
    T.uniforms.screenPosition = e.getUniformLocation(T.program, "screenPosition");
    var Ma = !1;
    _sprite = {};
    _sprite.vertices = new Float32Array(16);
    _sprite.faces = new Uint16Array(6);
    b = 0;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] =
        1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = -1;
    _sprite.vertices[b++] = 1;
    _sprite.vertices[b++] = 0;
    _sprite.vertices[b++] = 1;
    b = 0;
    _sprite.faces[b++] = 0;
    _sprite.faces[b++] = 1;
    _sprite.faces[b++] = 2;
    _sprite.faces[b++] = 0;
    _sprite.faces[b++] = 2;
    _sprite.faces[b++] = 3;
    _sprite.vertexBuffer = e.createBuffer();
    _sprite.elementBuffer = e.createBuffer();
    e.bindBuffer(e.ARRAY_BUFFER, _sprite.vertexBuffer);
    e.bufferData(e.ARRAY_BUFFER, _sprite.vertices, e.STATIC_DRAW);
    e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, _sprite.elementBuffer);
    e.bufferData(e.ELEMENT_ARRAY_BUFFER, _sprite.faces, e.STATIC_DRAW);
    _sprite.program = e.createProgram();
    e.attachShader(_sprite.program, da("fragment", THREE.ShaderLib.sprite.fragmentShader));
    e.attachShader(_sprite.program, da("vertex", THREE.ShaderLib.sprite.vertexShader));
    e.linkProgram(_sprite.program);
    _sprite.attributes = {};
    _sprite.uniforms = {};
    _sprite.attributes.position = e.getAttribLocation(_sprite.program, "position");
    _sprite.attributes.uv = e.getAttribLocation(_sprite.program, "uv");
    _sprite.uniforms.uvOffset =
        e.getUniformLocation(_sprite.program, "uvOffset");
    _sprite.uniforms.uvScale = e.getUniformLocation(_sprite.program, "uvScale");
    _sprite.uniforms.rotation = e.getUniformLocation(_sprite.program, "rotation");
    _sprite.uniforms.scale = e.getUniformLocation(_sprite.program, "scale");
    _sprite.uniforms.alignment = e.getUniformLocation(_sprite.program, "alignment");
    _sprite.uniforms.map = e.getUniformLocation(_sprite.program, "map");
    _sprite.uniforms.opacity = e.getUniformLocation(_sprite.program, "opacity");
    _sprite.uniforms.useScreenCoordinates =
        e.getUniformLocation(_sprite.program, "useScreenCoordinates");
    _sprite.uniforms.affectedByDistance = e.getUniformLocation(_sprite.program, "affectedByDistance");
    _sprite.uniforms.screenPosition = e.getUniformLocation(_sprite.program, "screenPosition");
    _sprite.uniforms.modelViewMatrix = e.getUniformLocation(_sprite.program, "modelViewMatrix");
    _sprite.uniforms.projectionMatrix = e.getUniformLocation(_sprite.program, "projectionMatrix");
    var db = !1;
    this.setSize = function (n, E) {
        xa.width = n;
        xa.height = E;
        this.setViewport(0,
            0, xa.width, xa.height)
    };
    this.setViewport = function (n, E, y, v) {
        pa = n;
        ja = E;
        Fa = y;
        Aa = v;
        e.viewport(pa, ja, Fa, Aa)
    };
    this.setScissor = function (n, E, y, v) {
        e.scissor(n, E, y, v)
    };
    this.enableScissorTest = function (n) {
        n ? e.enable(e.SCISSOR_TEST) : e.disable(e.SCISSOR_TEST)
    };
    this.enableDepthBufferWrite = function (n) {
        ra = n;
        e.depthMask(n)
    };
    this.setClearColorHex = function (n, E) {
        var y = new THREE.Color(n);
        e.clearColor(y.r, y.g, y.b, E)
    };
    this.setClearColor = function (n, E) {
        e.clearColor(n.r, n.g, n.b, E)
    };
    this.clear = function () {
        e.clear(e.COLOR_BUFFER_BIT |
            e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT)
    };
    this.setStencilShadowDarkness = function (n) {
        S.darkness = n
    };
    this.getContext = function () {
        return e
    };
    this.initMaterial = function (n, E, y, v) {
        var z, K, L;
        if (n instanceof THREE.MeshDepthMaterial)L = "depth"; else if (n instanceof THREE.ShadowVolumeDynamicMaterial)L = "shadowVolumeDynamic"; else if (n instanceof THREE.MeshNormalMaterial)L = "normal"; else if (n instanceof THREE.MeshBasicMaterial)L = "basic"; else if (n instanceof THREE.MeshLambertMaterial)L = "lambert"; else if (n instanceof
            THREE.MeshPhongMaterial)L = "phong"; else if (n instanceof THREE.LineBasicMaterial)L = "basic"; else n instanceof THREE.ParticleBasicMaterial && (L = "particle_basic");
        if (L) {
            var G = THREE.ShaderLib[L];
            n.uniforms = THREE.UniformsUtils.clone(G.uniforms);
            n.vertexShader = G.vertexShader;
            n.fragmentShader = G.fragmentShader
        }
        var P, Y, B;
        P = B = G = 0;
        for (Y = E.length; P < Y; P++) {
            K = E[P];
            K instanceof THREE.DirectionalLight && B++;
            K instanceof THREE.PointLight && G++
        }
        if (G + B <= 4)E = B; else {
            E = Math.ceil(4 * B / (G + B));
            G = 4 - E
        }
        K = {directional: E, point: G};
        B =
            50;
        if (v !== undefined && v instanceof THREE.SkinnedMesh)B = v.bones.length;
        var J;
        a:{
            P = n.fragmentShader;
            Y = n.vertexShader;
            G = n.uniforms;
            E = n.attributes;
            y = {
                map: !!n.map,
                envMap: !!n.envMap,
                lightMap: !!n.lightMap,
                vertexColors: n.vertexColors,
                fog: y,
                sizeAttenuation: n.sizeAttenuation,
                skinning: n.skinning,
                morphTargets: n.morphTargets,
                maxMorphTargets: this.maxMorphTargets,
                maxDirLights: K.directional,
                maxPointLights: K.point,
                maxBones: B
            };
            var X;
            K = [];
            if (L)K.push(L); else {
                K.push(P);
                K.push(Y)
            }
            for (X in y) {
                K.push(X);
                K.push(y[X])
            }
            L = K.join();
            X = 0;
            for (K = sa.length; X < K; X++)if (sa[X].code == L) {
                J = sa[X].program;
                break a
            }
            X = e.createProgram();
            prefix_fragment = ["#ifdef GL_ES\nprecision highp float;\n#endif", "#define MAX_DIR_LIGHTS " + y.maxDirLights, "#define MAX_POINT_LIGHTS " + y.maxPointLights, y.fog ? "#define USE_FOG" : "", y.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", y.map ? "#define USE_MAP" : "", y.envMap ? "#define USE_ENVMAP" : "", y.lightMap ? "#define USE_LIGHTMAP" : "", y.vertexColors ? "#define USE_COLOR" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
            prefix_vertex = [Z ? "#define VERTEX_TEXTURES" : "", "#define MAX_DIR_LIGHTS " + y.maxDirLights, "#define MAX_POINT_LIGHTS " + y.maxPointLights, "#define MAX_BONES " + y.maxBones, y.map ? "#define USE_MAP" : "", y.envMap ? "#define USE_ENVMAP" : "", y.lightMap ? "#define USE_LIGHTMAP" : "", y.vertexColors ? "#define USE_COLOR" : "", y.skinning ? "#define USE_SKINNING" : "", y.morphTargets ? "#define USE_MORPHTARGETS" : "", y.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n");
            e.attachShader(X, da("fragment", prefix_fragment + P));
            e.attachShader(X, da("vertex", prefix_vertex + Y));
            e.linkProgram(X);
            e.getProgramParameter(X, e.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + e.getProgramParameter(X, e.VALIDATE_STATUS) + ", gl error [" + e.getError() + "]");
            X.uniforms = {};
            X.attributes = {};
            var ka;
            P = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
            for (ka in G)P.push(ka);
            ka = P;
            G = 0;
            for (P = ka.length; G < P; G++) {
                Y = ka[G];
                X.uniforms[Y] = e.getUniformLocation(X, Y)
            }
            P = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
            for (ka = 0; ka < y.maxMorphTargets; ka++)P.push("morphTarget" + ka);
            for (J in E)P.push(J);
            J = P;
            ka = 0;
            for (E = J.length; ka < E; ka++) {
                y = J[ka];
                X.attributes[y] = e.getAttribLocation(X, y)
            }
            sa.push({program: X, code: L});
            J = X
        }
        n.program = J;
        J = n.program.attributes;
        J.position >= 0 && e.enableVertexAttribArray(J.position);
        J.color >= 0 && e.enableVertexAttribArray(J.color);
        J.normal >= 0 && e.enableVertexAttribArray(J.normal);
        J.tangent >= 0 && e.enableVertexAttribArray(J.tangent);
        if (n.skinning && J.skinVertexA >= 0 && J.skinVertexB >= 0 && J.skinIndex >= 0 && J.skinWeight >= 0) {
            e.enableVertexAttribArray(J.skinVertexA);
            e.enableVertexAttribArray(J.skinVertexB);
            e.enableVertexAttribArray(J.skinIndex);
            e.enableVertexAttribArray(J.skinWeight)
        }
        if (n.attributes)for (z in n.attributes)J[z] !== undefined && J[z] >= 0 && e.enableVertexAttribArray(J[z]);
        if (n.morphTargets) {
            n.numSupportedMorphTargets = 0;
            if (J.morphTarget0 >=
                0) {
                e.enableVertexAttribArray(J.morphTarget0);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget1 >= 0) {
                e.enableVertexAttribArray(J.morphTarget1);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget2 >= 0) {
                e.enableVertexAttribArray(J.morphTarget2);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget3 >= 0) {
                e.enableVertexAttribArray(J.morphTarget3);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget4 >= 0) {
                e.enableVertexAttribArray(J.morphTarget4);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget5 >= 0) {
                e.enableVertexAttribArray(J.morphTarget5);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget6 >= 0) {
                e.enableVertexAttribArray(J.morphTarget6);
                n.numSupportedMorphTargets++
            }
            if (J.morphTarget7 >= 0) {
                e.enableVertexAttribArray(J.morphTarget7);
                n.numSupportedMorphTargets++
            }
            v.__webglMorphTargetInfluences = new Float32Array(this.maxMorphTargets);
            n = 0;
            for (z = this.maxMorphTargets; n < z; n++)v.__webglMorphTargetInfluences[n] = 0
        }
    };
    this.render = function (n, E, y, v) {
        var z, K, L, G, P, Y, B, J, X = n.lights, ka = n.fog;
        na.data.vertices = 0;
        na.data.faces = 0;
        na.data.drawCalls = 0;
        E.matrixAutoUpdate &&
        E.update(undefined, !0);
        n.update(undefined, !1, E);
        E.matrixWorldInverse.flattenToArray(Ra);
        E.projectionMatrix.flattenToArray(Ja);
        ua.multiply(E.projectionMatrix, E.matrixWorldInverse);
        k(ua);
        this.initWebGLObjects(n);
        la(y);
        (this.autoClear || v) && this.clear();
        P = n.__webglObjects.length;
        for (v = 0; v < P; v++) {
            z = n.__webglObjects[v];
            B = z.object;
            if (B.visible)if (!(B instanceof THREE.Mesh) || m(B)) {
                B.matrixWorld.flattenToArray(B._objectMatrixArray);
                H(B, E);
                u(z);
                z.render = !0;
                if (this.sortObjects) {
                    Wa.copy(B.position);
                    ua.multiplyVector3(Wa);
                    z.z = Wa.z
                }
            } else z.render = !1; else z.render = !1
        }
        this.sortObjects && n.__webglObjects.sort(w);
        Y = n.__webglObjectsImmediate.length;
        for (v = 0; v < Y; v++) {
            z = n.__webglObjectsImmediate[v];
            B = z.object;
            if (B.visible) {
                B.matrixAutoUpdate && B.matrixWorld.flattenToArray(B._objectMatrixArray);
                H(B, E);
                t(z)
            }
        }
        V(THREE.NormalBlending);
        for (v = 0; v < P; v++) {
            z = n.__webglObjects[v];
            if (z.render) {
                B = z.object;
                J = z.buffer;
                L = z.opaque;
                h(B);
                for (z = 0; z < L.count; z++) {
                    G = L.list[z];
                    j(G.depthTest);
                    f(E, X, ka, G, J, B)
                }
            }
        }
        for (v = 0; v < Y; v++) {
            z = n.__webglObjectsImmediate[v];
            B = z.object;
            if (B.visible) {
                L = z.opaque;
                h(B);
                for (z = 0; z < L.count; z++) {
                    G = L.list[z];
                    j(G.depthTest);
                    K = c(E, X, ka, G, B);
                    B.render(function (ha) {
                        g(ha, K, G.shading)
                    })
                }
            }
        }
        for (v = 0; v < P; v++) {
            z = n.__webglObjects[v];
            if (z.render) {
                B = z.object;
                J = z.buffer;
                L = z.transparent;
                h(B);
                for (z = 0; z < L.count; z++) {
                    G = L.list[z];
                    V(G.blending);
                    j(G.depthTest);
                    f(E, X, ka, G, J, B)
                }
            }
        }
        for (v = 0; v < Y; v++) {
            z = n.__webglObjectsImmediate[v];
            B = z.object;
            if (B.visible) {
                L = z.transparent;
                h(B);
                for (z = 0; z < L.count; z++) {
                    G = L.list[z];
                    V(G.blending);
                    j(G.depthTest);
                    K = c(E, X, ka, G, B);
                    B.render(function (ha) {
                        g(ha, K, G.shading)
                    })
                }
            }
        }
        n.__webglSprites.length && A(n, E);
        stencil && n.__webglShadowVolumes.length && n.lights.length && p(n);
        n.__webglLensFlares.length && I(n, E);
        if (y && y.minFilter !== THREE.NearestFilter && y.minFilter !== THREE.LinearFilter) {
            e.bindTexture(e.TEXTURE_2D, y.__webglTexture);
            e.generateMipmap(e.TEXTURE_2D);
            e.bindTexture(e.TEXTURE_2D, null)
        }
    };
    this.initWebGLObjects = function (n) {
        if (!n.__webglObjects) {
            n.__webglObjects = [];
            n.__webglObjectsImmediate = [];
            n.__webglShadowVolumes = [];
            n.__webglLensFlares =
                [];
            n.__webglSprites = []
        }
        for (; n.__objectsAdded.length;) {
            var E = n.__objectsAdded[0], y = n, v = void 0, z = void 0, K = void 0;
            if (E._modelViewMatrix == undefined) {
                E._modelViewMatrix = new THREE.Matrix4;
                E._normalMatrixArray = new Float32Array(9);
                E._modelViewMatrixArray = new Float32Array(16);
                E._objectMatrixArray = new Float32Array(16);
                E.matrixWorld.flattenToArray(E._objectMatrixArray)
            }
            if (E instanceof THREE.Mesh) {
                z = E.geometry;
                z.geometryGroups == undefined && U(z);
                for (v in z.geometryGroups) {
                    K = z.geometryGroups[v];
                    if (!K.__webglVertexBuffer) {
                        var L =
                            K;
                        L.__webglVertexBuffer = e.createBuffer();
                        L.__webglNormalBuffer = e.createBuffer();
                        L.__webglTangentBuffer = e.createBuffer();
                        L.__webglColorBuffer = e.createBuffer();
                        L.__webglUVBuffer = e.createBuffer();
                        L.__webglUV2Buffer = e.createBuffer();
                        L.__webglSkinVertexABuffer = e.createBuffer();
                        L.__webglSkinVertexBBuffer = e.createBuffer();
                        L.__webglSkinIndicesBuffer = e.createBuffer();
                        L.__webglSkinWeightsBuffer = e.createBuffer();
                        L.__webglFaceBuffer = e.createBuffer();
                        L.__webglLineBuffer = e.createBuffer();
                        if (L.numMorphTargets) {
                            var G =
                                void 0, P = void 0;
                            L.__webglMorphTargetsBuffers = [];
                            G = 0;
                            for (P = L.numMorphTargets; G < P; G++)L.__webglMorphTargetsBuffers.push(e.createBuffer())
                        }
                        L = K;
                        G = E;
                        var Y = void 0, B = void 0, J = void 0;
                        J = void 0;
                        var X = void 0, ka = void 0, ha = void 0, Ha = ha = P = 0;
                        B = void 0;
                        J = void 0;
                        var Ba = void 0;
                        Y = void 0;
                        B = void 0;
                        X = G.geometry;
                        Ba = X.faces;
                        ka = L.faces;
                        Y = 0;
                        for (B = ka.length; Y < B; Y++) {
                            J = ka[Y];
                            J = Ba[J];
                            if (J instanceof THREE.Face3) {
                                P += 3;
                                ha += 1;
                                Ha += 3
                            } else if (J instanceof THREE.Face4) {
                                P += 4;
                                ha += 2;
                                Ha += 4
                            }
                        }
                        Y = L;
                        B = G;
                        Ba = void 0;
                        ka = void 0;
                        var La = void 0, Xa = void 0;
                        La = void 0;
                        J = [];
                        Ba = 0;
                        for (ka = B.materials.length; Ba < ka; Ba++) {
                            La = B.materials[Ba];
                            if (La instanceof THREE.MeshFaceMaterial) {
                                La = 0;
                                for (l = Y.materials.length; La < l; La++)(Xa = Y.materials[La]) && J.push(Xa)
                            } else(Xa = La) && J.push(Xa)
                        }
                        Y = J;
                        a:{
                            B = void 0;
                            Ba = void 0;
                            ka = Y.length;
                            for (B = 0; B < ka; B++) {
                                Ba = Y[B];
                                if (Ba.map || Ba.lightMap || Ba instanceof THREE.MeshShaderMaterial) {
                                    B = !0;
                                    break a
                                }
                            }
                            B = !1
                        }
                        a:{
                            Ba = Y;
                            ka = void 0;
                            J = void 0;
                            La = Ba.length;
                            for (ka = 0; ka < La; ka++) {
                                J = Ba[ka];
                                if (!(J instanceof THREE.MeshBasicMaterial && !J.envMap || J instanceof THREE.MeshDepthMaterial)) {
                                    Ba =
                                        J && J.shading != undefined && J.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                                    break a
                                }
                            }
                            Ba = !1
                        }
                        a:{
                            ka = void 0;
                            J = void 0;
                            La = Y.length;
                            for (ka = 0; ka < La; ka++) {
                                J = Y[ka];
                                if (J.vertexColors) {
                                    J = J.vertexColors;
                                    break a
                                }
                            }
                            J = !1
                        }
                        L.__vertexArray = new Float32Array(P * 3);
                        if (Ba)L.__normalArray = new Float32Array(P * 3);
                        if (X.hasTangents)L.__tangentArray = new Float32Array(P * 4);
                        if (J)L.__colorArray = new Float32Array(P * 3);
                        if (B) {
                            if (X.faceUvs.length > 0 || X.faceVertexUvs.length > 0)L.__uvArray = new Float32Array(P * 2);
                            if (X.faceUvs.length >
                                1 || X.faceVertexUvs.length > 1)L.__uv2Array = new Float32Array(P * 2)
                        }
                        if (G.geometry.skinWeights.length && G.geometry.skinIndices.length) {
                            L.__skinVertexAArray = new Float32Array(P * 4);
                            L.__skinVertexBArray = new Float32Array(P * 4);
                            L.__skinIndexArray = new Float32Array(P * 4);
                            L.__skinWeightArray = new Float32Array(P * 4)
                        }
                        L.__faceArray = new Uint16Array(ha * 3 + (G.geometry.edgeFaces ? G.geometry.edgeFaces.length * 6 : 0));
                        L.__lineArray = new Uint16Array(Ha * 2);
                        if (L.numMorphTargets) {
                            L.__morphTargetsArrays = [];
                            X = 0;
                            for (ka = L.numMorphTargets; X <
                            ka; X++)L.__morphTargetsArrays.push(new Float32Array(P * 3))
                        }
                        L.__needsSmoothNormals = Ba == THREE.SmoothShading;
                        L.__uvType = B;
                        L.__vertexColorType = J;
                        L.__normalType = Ba;
                        L.__webglFaceCount = ha * 3 + (G.geometry.edgeFaces ? G.geometry.edgeFaces.length * 6 : 0);
                        L.__webglLineCount = Ha * 2;
                        X = 0;
                        for (ka = Y.length; X < ka; X++)if (Y[X].attributes) {
                            L.__webglCustomAttributes = {};
                            for (a in Y[X].attributes) {
                                B = Y[X].attributes[a];
                                if (!B.__webglInitialized || B.createUniqueBuffers) {
                                    B.__webglInitialized = !0;
                                    ha = 1;
                                    if (B.type === "v2")ha = 2; else if (B.type ===
                                        "v3")ha = 3; else if (B.type === "v4")ha = 4; else B.type === "c" && (ha = 3);
                                    B.size = ha;
                                    B.needsUpdate = !0;
                                    B.array = new Float32Array(P * ha);
                                    B.buffer = e.createBuffer();
                                    B.buffer.belongsToAttribute = a
                                }
                                L.__webglCustomAttributes[a] = B
                            }
                        }
                        L.__inittedArrays = !0;
                        z.__dirtyVertices = !0;
                        z.__dirtyMorphTargets = !0;
                        z.__dirtyElements = !0;
                        z.__dirtyUvs = !0;
                        z.__dirtyNormals = !0;
                        z.__dirtyTangents = !0;
                        z.__dirtyColors = !0
                    }
                    E instanceof THREE.ShadowVolume ? D(y.__webglShadowVolumes, K, E) : D(y.__webglObjects, K, E)
                }
            } else if (E instanceof THREE.LensFlare)D(y.__webglLensFlares,
                undefined, E); else if (E instanceof THREE.Ribbon) {
                z = E.geometry;
                if (!z.__webglVertexBuffer) {
                    v = z;
                    v.__webglVertexBuffer = e.createBuffer();
                    v.__webglColorBuffer = e.createBuffer();
                    v = z;
                    K = v.vertices.length;
                    v.__vertexArray = new Float32Array(K * 3);
                    v.__colorArray = new Float32Array(K * 3);
                    v.__webglVertexCount = K;
                    z.__dirtyVertices = !0;
                    z.__dirtyColors = !0
                }
                D(y.__webglObjects, z, E)
            } else if (E instanceof THREE.Line) {
                z = E.geometry;
                if (!z.__webglVertexBuffer) {
                    v = z;
                    v.__webglVertexBuffer = e.createBuffer();
                    v.__webglColorBuffer = e.createBuffer();
                    v = z;
                    K = v.vertices.length;
                    v.__vertexArray = new Float32Array(K * 3);
                    v.__colorArray = new Float32Array(K * 3);
                    v.__webglLineCount = K;
                    z.__dirtyVertices = !0;
                    z.__dirtyColors = !0
                }
                D(y.__webglObjects, z, E)
            } else if (E instanceof THREE.ParticleSystem) {
                z = E.geometry;
                if (!z.__webglVertexBuffer) {
                    v = z;
                    v.__webglVertexBuffer = e.createBuffer();
                    v.__webglColorBuffer = e.createBuffer();
                    v = z;
                    K = v.vertices.length;
                    v.__vertexArray = new Float32Array(K * 3);
                    v.__colorArray = new Float32Array(K * 3);
                    v.__sortArray = [];
                    v.__webglParticleCount = K;
                    z.__dirtyVertices = !0;
                    z.__dirtyColors = !0
                }
                D(y.__webglObjects, z, E)
            } else if (THREE.MarchingCubes !== undefined && E instanceof THREE.MarchingCubes)y.__webglObjectsImmediate.push({
                object: E,
                opaque: {list: [], count: 0},
                transparent: {list: [], count: 0}
            }); else E instanceof THREE.Sprite && y.__webglSprites.push(E);
            n.__objectsAdded.splice(0, 1)
        }
        for (; n.__objectsRemoved.length;) {
            E = n.__objectsRemoved[0];
            y = n;
            z = void 0;
            v = void 0;
            if (E instanceof THREE.Mesh)for (z = y.__webglObjects.length - 1; z >= 0; z--) {
                v = y.__webglObjects[z].object;
                if (E == v) {
                    y.__webglObjects.splice(z,
                        1);
                    break
                }
            } else if (E instanceof THREE.Sprite)for (z = y.__webglSprites.length - 1; z >= 0; z--) {
                v = y.__webglSprites[z];
                if (E == v) {
                    y.__webglSprites.splice(z, 1);
                    break
                }
            }
            n.__objectsRemoved.splice(0, 1)
        }
        E = 0;
        for (y = n.__webglObjects.length; E < y; E++)C(n.__webglObjects[E].object, n);
        E = 0;
        for (y = n.__webglShadowVolumes.length; E < y; E++)C(n.__webglShadowVolumes[E].object, n);
        E = 0;
        for (y = n.__webglLensFlares.length; E < y; E++)C(n.__webglLensFlares[E].object, n)
    };
    this.setFaceCulling = function (n, E) {
        if (n) {
            !E || E == "ccw" ? e.frontFace(e.CCW) : e.frontFace(e.CW);
            if (n == "back")e.cullFace(e.BACK); else n == "front" ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK);
            e.enable(e.CULL_FACE)
        } else e.disable(e.CULL_FACE)
    };
    this.supportsVertexTextures = function () {
        return Z
    }
};
THREE.WebGLRenderTarget = function (b, d, c) {
    this.width = b;
    this.height = d;
    c = c || {};
    this.wrapS = c.wrapS !== undefined ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = c.wrapT !== undefined ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = c.magFilter !== undefined ? c.magFilter : THREE.LinearFilter;
    this.minFilter = c.minFilter !== undefined ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.format = c.format !== undefined ? c.format : THREE.RGBAFormat;
    this.type = c.type !== undefined ? c.type : THREE.UnsignedByteType;
    this.depthBuffer = c.depthBuffer !==
    undefined ? c.depthBuffer : !0;
    this.stencilBuffer = c.stencilBuffer !== undefined ? c.stencilBuffer : !0
};
THREE.SoundRenderer = function () {
    this.volume = 1;
    this.domElement = document.createElement("div");
    this.domElement.id = "THREESound";
    this.cameraPosition = new THREE.Vector3;
    this.soundPosition = new THREE.Vector3;
    this.render = function (b, d, c) {
        c && b.update(undefined, !1, d);
        c = b.sounds;
        var f, g = c.length;
        for (f = 0; f < g; f++) {
            b = c[f];
            this.soundPosition.set(b.matrixWorld.n14, b.matrixWorld.n24, b.matrixWorld.n34);
            this.soundPosition.subSelf(d.position);
            if (b.isPlaying && b.isLoaded) {
                b.isAddedToDOM || b.addToDOM(this.domElement);
                b.calculateVolumeAndPan(this.soundPosition)
            }
        }
    }
};
THREE.RenderableVertex = function () {
    this.positionWorld = new THREE.Vector3;
    this.positionScreen = new THREE.Vector4;
    this.visible = !0
};
THREE.RenderableVertex.prototype.copy = function (b) {
    this.positionWorld.copy(b.positionWorld);
    this.positionScreen.copy(b.positionScreen)
};
THREE.RenderableFace3 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterials = this.meshMaterials = null;
    this.overdraw = !1;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableFace4 = function () {
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.v3 = new THREE.RenderableVertex;
    this.v4 = new THREE.RenderableVertex;
    this.centroidWorld = new THREE.Vector3;
    this.centroidScreen = new THREE.Vector3;
    this.normalWorld = new THREE.Vector3;
    this.vertexNormalsWorld = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
    this.faceMaterials = this.meshMaterials = null;
    this.overdraw = !1;
    this.uvs = [[]];
    this.z = null
};
THREE.RenderableObject = function () {
    this.z = this.object = null
};
THREE.RenderableParticle = function () {
    this.rotation = this.z = this.y = this.x = null;
    this.scale = new THREE.Vector2;
    this.materials = null
};
THREE.RenderableLine = function () {
    this.z = null;
    this.v1 = new THREE.RenderableVertex;
    this.v2 = new THREE.RenderableVertex;
    this.materials = null
};
THREE.ColorUtils = {
    adjustHSV: function (b, d, c, f) {
        var g = THREE.ColorUtils.__hsv;
        THREE.ColorUtils.rgbToHsv(b, g);
        g.h = THREE.ColorUtils.clamp(g.h + d, 0, 1);
        g.s = THREE.ColorUtils.clamp(g.s + c, 0, 1);
        g.v = THREE.ColorUtils.clamp(g.v + f, 0, 1);
        b.setHSV(g.h, g.s, g.v)
    }, rgbToHsv: function (b, d) {
        var c = b.r, f = b.g, g = b.b, h = Math.max(Math.max(c, f), g), j = Math.min(Math.min(c, f), g);
        if (j == h)j = c = 0; else {
            var k = h - j;
            j = k / h;
            c = c == h ? (f - g) / k : f == h ? 2 + (g - c) / k : 4 + (c - f) / k;
            c /= 6;
            c < 0 && (c += 1);
            c > 1 && (c -= 1)
        }
        d === undefined && (d = {h: 0, s: 0, v: 0});
        d.h = c;
        d.s = j;
        d.v = h;
        return d
    },
    clamp: function (b, d, c) {
        return b < d ? d : b > c ? c : b
    }
};
THREE.ColorUtils.__hsv = {h: 0, s: 0, v: 0};
var GeometryUtils = {
    merge: function (b, d) {
        var c = d instanceof THREE.Mesh, f = b.vertices.length, g = c ? d.geometry : d, h = b.vertices, j = g.vertices, k = b.faces, m = g.faces, o = b.faceVertexUvs[0];
        g = g.faceVertexUvs[0];
        c && d.matrixAutoUpdate && d.updateMatrix();
        for (var t = 0, u = j.length; t < u; t++) {
            var w = new THREE.Vertex(j[t].position.clone());
            c && d.matrix.multiplyVector3(w.position);
            h.push(w)
        }
        t = 0;
        for (u = m.length; t < u; t++) {
            j = m[t];
            var p, A, I = j.vertexNormals;
            w = j.vertexColors;
            if (j instanceof THREE.Face3)p = new THREE.Face3(j.a + f, j.b + f, j.c +
                f); else j instanceof THREE.Face4 && (p = new THREE.Face4(j.a + f, j.b + f, j.c + f, j.d + f));
            p.normal.copy(j.normal);
            c = 0;
            for (h = I.length; c < h; c++) {
                A = I[c];
                p.vertexNormals.push(A.clone())
            }
            p.color.copy(j.color);
            c = 0;
            for (h = w.length; c < h; c++) {
                A = w[c];
                p.vertexColors.push(A.clone())
            }
            p.materials = j.materials.slice();
            p.centroid.copy(j.centroid);
            k.push(p)
        }
        t = 0;
        for (u = g.length; t < u; t++) {
            f = g[t];
            k = [];
            c = 0;
            for (h = f.length; c < h; c++)k.push(new THREE.UV(f[c].u, f[c].v));
            o.push(k)
        }
    }
};
THREE.ImageUtils = {
    loadTexture: function (b, d, c) {
        var f = new Image, g = new THREE.Texture(f, d);
        f.onload = function () {
            g.needsUpdate = !0;
            c && c(this)
        };
        f.src = b;
        return g
    }, loadTextureCube: function (b, d, c) {
        var f, g = [], h = new THREE.Texture(g, d);
        d = g.loadCount = 0;
        for (f = b.length; d < f; ++d) {
            g[d] = new Image;
            g[d].onload = function () {
                g.loadCount += 1;
                if (g.loadCount == 6)h.needsUpdate = !0;
                c && c(this)
            };
            g[d].src = b[d]
        }
        return h
    }
};
THREE.SceneUtils = {
    addMesh: function (b, d, c, f, g, h, j, k, m, o) {
        d = new THREE.Mesh(d, o);
        d.scale.x = d.scale.y = d.scale.z = c;
        d.position.x = f;
        d.position.y = g;
        d.position.z = h;
        d.rotation.x = j;
        d.rotation.y = k;
        d.rotation.z = m;
        b.addObject(d);
        return d
    }, addPanoramaCubeWebGL: function (b, d, c) {
        var f = THREE.ShaderUtils.lib.cube;
        f.uniforms.tCube.texture = c;
        c = new THREE.MeshShaderMaterial({
            fragmentShader: f.fragmentShader,
            vertexShader: f.vertexShader,
            uniforms: f.uniforms
        });
        d = new THREE.Mesh(new THREE.Cube(d, d, d, 1, 1, 1, null, !0), c);
        b.addObject(d);
        return d
    }, addPanoramaCube: function (b, d, c) {
        var f = [];
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[0])}));
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[1])}));
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[2])}));
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[3])}));
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[4])}));
        f.push(new THREE.MeshBasicMaterial({map: new THREE.Texture(c[5])}));
        d = new THREE.Mesh(new THREE.Cube(d, d, d, 1, 1, f, !0),
            new THREE.MeshFaceMaterial);
        b.addObject(d);
        return d
    }, addPanoramaCubePlanes: function (b, d, c) {
        var f = d / 2;
        d = new THREE.Plane(d, d);
        var g = Math.PI, h = Math.PI / 2;
        THREE.SceneUtils.addMesh(b, d, 1, 0, 0, -f, 0, 0, 0, new THREE.MeshBasicMaterial({map: new THREE.Texture(c[5])}));
        THREE.SceneUtils.addMesh(b, d, 1, -f, 0, 0, 0, h, 0, new THREE.MeshBasicMaterial({map: new THREE.Texture(c[0])}));
        THREE.SceneUtils.addMesh(b, d, 1, f, 0, 0, 0, -h, 0, new THREE.MeshBasicMaterial({map: new THREE.Texture(c[1])}));
        THREE.SceneUtils.addMesh(b, d, 1, 0, f, 0, h,
            0, g, new THREE.MeshBasicMaterial({map: new THREE.Texture(c[2])}));
        THREE.SceneUtils.addMesh(b, d, 1, 0, -f, 0, -h, 0, g, new THREE.MeshBasicMaterial({map: new THREE.Texture(c[3])}))
    }, showHierarchy: function (b, d) {
        THREE.SceneUtils.traverseHierarchy(b, function (c) {
            c.visible = d
        })
    }, traverseHierarchy: function (b, d) {
        var c, f, g = b.children.length;
        for (f = 0; f < g; f++) {
            c = b.children[f];
            d(c);
            THREE.SceneUtils.traverseHierarchy(c, d)
        }
    }
};
THREE.ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {type: "f", value: 1.02},
                mFresnelBias: {type: "f", value: 0.1},
                mFresnelPower: {type: "f", value: 2},
                mFresnelScale: {type: "f", value: 1},
                tCube: {type: "t", value: 1, texture: null}
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: {
                enableAO: {type: "i", value: 0},
                enableDiffuse: {type: "i", value: 0},
                enableSpecular: {type: "i", value: 0},
                tDiffuse: {type: "t", value: 0, texture: null},
                tNormal: {type: "t", value: 2, texture: null},
                tSpecular: {type: "t", value: 3, texture: null},
                tAO: {type: "t", value: 4, texture: null},
                uNormalScale: {type: "f", value: 1},
                tDisplacement: {type: "t", value: 5, texture: null},
                uDisplacementBias: {type: "f", value: -0.5},
                uDisplacementScale: {type: "f", value: 2.5},
                uPointLightPos: {type: "v3", value: new THREE.Vector3},
                uPointLightColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uDirLightPos: {type: "v3", value: new THREE.Vector3},
                uDirLightColor: {type: "c", value: new THREE.Color(15658734)},
                uAmbientLightColor: {type: "c", value: new THREE.Color(328965)},
                uDiffuseColor: {type: "c", value: new THREE.Color(15658734)},
                uSpecularColor: {type: "c", value: new THREE.Color(1118481)},
                uAmbientColor: {type: "c", value: new THREE.Color(328965)},
                uShininess: {type: "f", value: 30}
            },
            fragmentShader: "uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 specularTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = specularTex.r * pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight * pointDiffuseWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = specularTex.r * pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight * dirDiffuseWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
            vertexShader: "attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"
        },
        cube: {
            uniforms: {tCube: {type: "t", value: 1, texture: null}},
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"
        }, convolution: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0, texture: null
                },
                uImageIncrement: {type: "v2", value: new THREE.Vector2(0.001953125, 0)},
                cKernel: {type: "fv1", value: []}
            },
            vertexShader: "varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"
        },
        film: {
            uniforms: {
                tDiffuse: {type: "t", value: 0, texture: null},
                time: {type: "f", value: 0},
                nIntensity: {type: "f", value: 0.5},
                sIntensity: {type: "f", value: 0.05},
                sCount: {type: "f", value: 4096},
                grayscale: {type: "i", value: 1}
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"
        },
        screen: {
            uniforms: {tDiffuse: {type: "t", value: 0, texture: null}, opacity: {type: "f", value: 1}},
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"
        }, basic: {
            uniforms: {},
            vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"
        }
    }, buildKernel: function (b) {
        var d, c, f, g, h = 2 * Math.ceil(b * 3) + 1;
        h > 25 && (h = 25);
        g = (h - 1) * 0.5;
        c = Array(h);
        for (d = f = 0; d < h; ++d) {
            c[d] = Math.exp(-((d - g) * (d - g)) / (2 * b * b));
            f += c[d]
        }
        for (d = 0; d < h; ++d)c[d] /= f;
        return c
    }
};
THREE.AnimationHandler = function () {
    var b = [], d = {}, c = {};
    c.update = function (g) {
        for (var h = 0; h < b.length; h++)b[h].update(g)
    };
    c.addToUpdate = function (g) {
        b.indexOf(g) === -1 && b.push(g)
    };
    c.removeFromUpdate = function (g) {
        g = b.indexOf(g);
        g !== -1 && b.splice(g, 1)
    };
    c.add = function (g) {
        d[g.name] !== undefined && console.log("THREE.AnimationHandler.add: Warning! " + g.name + " already exists in library. Overwriting.");
        d[g.name] = g;
        if (g.initialized !== !0) {
            for (var h = 0; h < g.hierarchy.length; h++) {
                for (var j = 0; j < g.hierarchy[h].keys.length; j++) {
                    if (g.hierarchy[h].keys[j].time <
                        0)g.hierarchy[h].keys[j].time = 0;
                    if (g.hierarchy[h].keys[j].rot !== undefined && !(g.hierarchy[h].keys[j].rot instanceof THREE.Quaternion)) {
                        var k = g.hierarchy[h].keys[j].rot;
                        g.hierarchy[h].keys[j].rot = new THREE.Quaternion(k[0], k[1], k[2], k[3])
                    }
                }
                if (g.hierarchy[h].keys[0].morphTargets !== undefined) {
                    k = {};
                    for (j = 0; j < g.hierarchy[h].keys.length; j++)for (var m = 0; m < g.hierarchy[h].keys[j].morphTargets.length; m++) {
                        var o = g.hierarchy[h].keys[j].morphTargets[m];
                        k[o] = -1
                    }
                    g.hierarchy[h].usedMorphTargets = k;
                    for (j = 0; j < g.hierarchy[h].keys.length; j++) {
                        var t =
                        {};
                        for (o in k) {
                            for (m = 0; m < g.hierarchy[h].keys[j].morphTargets.length; m++)if (g.hierarchy[h].keys[j].morphTargets[m] === o) {
                                t[o] = g.hierarchy[h].keys[j].morphTargetsInfluences[m];
                                break
                            }
                            m === g.hierarchy[h].keys[j].morphTargets.length && (t[o] = 0)
                        }
                        g.hierarchy[h].keys[j].morphTargetsInfluences = t
                    }
                }
                for (j = 1; j < g.hierarchy[h].keys.length; j++)if (g.hierarchy[h].keys[j].time === g.hierarchy[h].keys[j - 1].time) {
                    g.hierarchy[h].keys.splice(j, 1);
                    j--
                }
                for (j = 1; j < g.hierarchy[h].keys.length; j++)g.hierarchy[h].keys[j].index = j
            }
            j = parseInt(g.length *
                g.fps, 10);
            g.JIT = {};
            g.JIT.hierarchy = [];
            for (h = 0; h < g.hierarchy.length; h++)g.JIT.hierarchy.push(Array(j));
            g.initialized = !0
        }
    };
    c.get = function (g) {
        if (typeof g === "string")if (d[g])return d[g]; else {
            console.log("THREE.AnimationHandler.get: Couldn't find animation " + g);
            return null
        }
    };
    c.parse = function (g) {
        var h = [];
        if (g instanceof THREE.SkinnedMesh)for (var j = 0; j < g.bones.length; j++)h.push(g.bones[j]); else f(g, h);
        return h
    };
    var f = function (g, h) {
        h.push(g);
        for (var j = 0; j < g.children.length; j++)f(g.children[j], h)
    };
    c.LINEAR =
        0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD = 2;
    return c
}();
THREE.Animation = function (b, d, c, f) {
    this.root = b;
    this.data = THREE.AnimationHandler.get(d);
    this.hierarchy = THREE.AnimationHandler.parse(b);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.isPaused = !0;
    this.loop = !0;
    this.interpolationType = c !== undefined ? c : THREE.AnimationHandler.LINEAR;
    this.JITCompile = f !== undefined ? f : !0;
    this.points = [];
    this.target = new THREE.Vector3
};
THREE.Animation.prototype.play = function (b, d) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = b !== undefined ? b : !0;
        this.currentTime = d !== undefined ? d : 0;
        var c, f = this.hierarchy.length, g;
        for (c = 0; c < f; c++) {
            g = this.hierarchy[c];
            if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD)g.useQuaternion = !0;
            g.matrixAutoUpdate = !0;
            if (g.animationCache === undefined) {
                g.animationCache = {};
                g.animationCache.prevKey = {pos: 0, rot: 0, scl: 0};
                g.animationCache.nextKey = {pos: 0, rot: 0, scl: 0};
                g.animationCache.originalMatrix =
                    g instanceof THREE.Bone ? g.skinMatrix : g.matrix
            }
            var h = g.animationCache.prevKey;
            g = g.animationCache.nextKey;
            h.pos = this.data.hierarchy[c].keys[0];
            h.rot = this.data.hierarchy[c].keys[0];
            h.scl = this.data.hierarchy[c].keys[0];
            g.pos = this.getNextKeyWith("pos", c, 1);
            g.rot = this.getNextKeyWith("rot", c, 1);
            g.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
};
THREE.Animation.prototype.pause = function () {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
};
THREE.Animation.prototype.stop = function () {
    this.isPlaying = !1;
    this.isPaused = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var b = 0; b < this.hierarchy.length; b++)if (this.hierarchy[b].animationCache !== undefined) {
        if (this.hierarchy[b]instanceof THREE.Bone)this.hierarchy[b].skinMatrix = this.hierarchy[b].animationCache.originalMatrix; else this.hierarchy[b].matrix = this.hierarchy[b].animationCache.originalMatrix;
        delete this.hierarchy[b].animationCache
    }
};
THREE.Animation.prototype.update = function (b) {
    if (this.isPlaying) {
        var d = ["pos", "rot", "scl"], c, f, g, h, j, k, m, o, t = this.data.JIT.hierarchy, u, w;
        this.currentTime += b * this.timeScale;
        w = this.currentTime;
        u = this.currentTime %= this.data.length;
        o = parseInt(Math.min(u * this.data.fps, this.data.length * this.data.fps), 10);
        for (var p = 0, A = this.hierarchy.length; p < A; p++) {
            b = this.hierarchy[p];
            m = b.animationCache;
            if (this.JITCompile && t[p][o] !== undefined)if (b instanceof THREE.Bone) {
                b.skinMatrix = t[p][o];
                b.matrixAutoUpdate = !1;
                b.matrixWorldNeedsUpdate = !1
            } else {
                b.matrix = t[p][o];
                b.matrixAutoUpdate = !1;
                b.matrixWorldNeedsUpdate = !0
            } else {
                if (this.JITCompile)if (b instanceof THREE.Bone)b.skinMatrix = b.animationCache.originalMatrix; else b.matrix = b.animationCache.originalMatrix;
                for (var I = 0; I < 3; I++) {
                    c = d[I];
                    j = m.prevKey[c];
                    k = m.nextKey[c];
                    if (k.time <= w) {
                        if (u < w)if (this.loop) {
                            j = this.data.hierarchy[p].keys[0];
                            for (k = this.getNextKeyWith(c, p, 1); k.time < u;) {
                                j = k;
                                k = this.getNextKeyWith(c, p, k.index + 1)
                            }
                        } else {
                            this.stop();
                            return
                        } else {
                            do {
                                j = k;
                                k = this.getNextKeyWith(c, p, k.index + 1)
                            } while (k.time <
                            u)
                        }
                        m.prevKey[c] = j;
                        m.nextKey[c] = k
                    }
                    b.matrixAutoUpdate = !0;
                    b.matrixWorldNeedsUpdate = !0;
                    f = (u - j.time) / (k.time - j.time);
                    g = j[c];
                    h = k[c];
                    if (f < 0 || f > 1) {
                        console.log("THREE.Animation.update: Warning! Scale out of bounds:" + f + " on bone " + p);
                        f = f < 0 ? 0 : 1
                    }
                    if (c === "pos") {
                        c = b.position;
                        if (this.interpolationType === THREE.AnimationHandler.LINEAR) {
                            c.x = g[0] + (h[0] - g[0]) * f;
                            c.y = g[1] + (h[1] - g[1]) * f;
                            c.z = g[2] + (h[2] - g[2]) * f
                        } else if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                            this.points[0] =
                                this.getPrevKeyWith("pos", p, j.index - 1).pos;
                            this.points[1] = g;
                            this.points[2] = h;
                            this.points[3] = this.getNextKeyWith("pos", p, k.index + 1).pos;
                            f = f * 0.33 + 0.33;
                            g = this.interpolateCatmullRom(this.points, f);
                            c.x = g[0];
                            c.y = g[1];
                            c.z = g[2];
                            if (this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                                f = this.interpolateCatmullRom(this.points, f * 1.01);
                                this.target.set(f[0], f[1], f[2]);
                                this.target.subSelf(c);
                                this.target.y = 0;
                                this.target.normalize();
                                f = Math.atan2(this.target.x, this.target.z);
                                b.rotation.set(0, f, 0)
                            }
                        }
                    } else if (c ===
                        "rot")THREE.Quaternion.slerp(g, h, b.quaternion, f); else if (c === "scl") {
                        c = b.scale;
                        c.x = g[0] + (h[0] - g[0]) * f;
                        c.y = g[1] + (h[1] - g[1]) * f;
                        c.z = g[2] + (h[2] - g[2]) * f
                    }
                }
            }
        }
        if (this.JITCompile && t[0][o] === undefined) {
            this.hierarchy[0].update(undefined, !0);
            for (p = 0; p < this.hierarchy.length; p++)t[p][o] = this.hierarchy[p]instanceof THREE.Bone ? this.hierarchy[p].skinMatrix.clone() : this.hierarchy[p].matrix.clone()
        }
    }
};
THREE.Animation.prototype.interpolateCatmullRom = function (b, d) {
    var c = [], f = [], g, h, j, k, m, o;
    g = (b.length - 1) * d;
    h = Math.floor(g);
    g -= h;
    c[0] = h == 0 ? h : h - 1;
    c[1] = h;
    c[2] = h > b.length - 2 ? h : h + 1;
    c[3] = h > b.length - 3 ? h : h + 2;
    h = b[c[0]];
    k = b[c[1]];
    m = b[c[2]];
    o = b[c[3]];
    c = g * g;
    j = g * c;
    f[0] = this.interpolate(h[0], k[0], m[0], o[0], g, c, j);
    f[1] = this.interpolate(h[1], k[1], m[1], o[1], g, c, j);
    f[2] = this.interpolate(h[2], k[2], m[2], o[2], g, c, j);
    return f
};
THREE.Animation.prototype.interpolate = function (b, d, c, f, g, h, j) {
    b = (c - b) * 0.5;
    f = (f - d) * 0.5;
    return (2 * (d - c) + b + f) * j + (-3 * (d - c) - 2 * b - f) * h + b * g + d
};
THREE.Animation.prototype.getNextKeyWith = function (b, d, c) {
    var f = this.data.hierarchy[d].keys;
    if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD)c = c < f.length - 1 ? c : f.length - 1; else c %= f.length;
    for (; c < f.length; c++)if (f[c][b] !== undefined)return f[c];
    return this.data.hierarchy[d].keys[0]
};
THREE.Animation.prototype.getPrevKeyWith = function (b, d, c) {
    var f = this.data.hierarchy[d].keys;
    for (c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + f.length; c >= 0; c--)if (f[c][b] !== undefined)return f[c];
    return this.data.hierarchy[d].keys[f.length - 1]
};
THREE.QuakeCamera = function (b) {
    function d(c, f) {
        return function () {
            f.apply(c, arguments)
        }
    }

    THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.noFly = !1;
    this.lookVertical = !0;
    this.autoForward = !1;
    this.activeLook = !0;
    this.heightSpeed = !1;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.constrainVertical = !1;
    this.verticalMin = 0;
    this.verticalMax = 3.14;
    this.domElement = document;
    this.lastUpdate = (new Date).getTime();
    this.tdiff = 0;
    if (b) {
        if (b.movementSpeed !== undefined)this.movementSpeed =
            b.movementSpeed;
        if (b.lookSpeed !== undefined)this.lookSpeed = b.lookSpeed;
        if (b.noFly !== undefined)this.noFly = b.noFly;
        if (b.lookVertical !== undefined)this.lookVertical = b.lookVertical;
        if (b.autoForward !== undefined)this.autoForward = b.autoForward;
        if (b.activeLook !== undefined)this.activeLook = b.activeLook;
        if (b.heightSpeed !== undefined)this.heightSpeed = b.heightSpeed;
        if (b.heightCoef !== undefined)this.heightCoef = b.heightCoef;
        if (b.heightMin !== undefined)this.heightMin = b.heightMin;
        if (b.heightMax !== undefined)this.heightMax =
            b.heightMax;
        if (b.constrainVertical !== undefined)this.constrainVertical = b.constrainVertical;
        if (b.verticalMin !== undefined)this.verticalMin = b.verticalMin;
        if (b.verticalMax !== undefined)this.verticalMax = b.verticalMax;
        if (b.domElement !== undefined)this.domElement = b.domElement
    }
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = this.autoSpeedFactor = 0;
    this.moveForward = !1;
    this.moveBackward = !1;
    this.moveLeft = !1;
    this.moveRight = !1;
    this.freeze = !1;
    this.mouseDragOn = !1;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY =
        window.innerHeight / 2;
    this.onMouseDown = function (c) {
        c.preventDefault();
        c.stopPropagation();
        if (this.activeLook)switch (c.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
        this.mouseDragOn = !0
    };
    this.onMouseUp = function (c) {
        c.preventDefault();
        c.stopPropagation();
        if (this.activeLook)switch (c.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.mouseDragOn = !1
    };
    this.onMouseMove = function (c) {
        this.mouseX = c.clientX - this.windowHalfX;
        this.mouseY = c.clientY - this.windowHalfY
    };
    this.onKeyDown =
        function (c) {
            switch (c.keyCode) {
                case 38:
                case 87:
                    this.moveForward = !0;
                    break;
                case 37:
                case 65:
                    this.moveLeft = !0;
                    break;
                case 40:
                case 83:
                    this.moveBackward = !0;
                    break;
                case 39:
                case 68:
                    this.moveRight = !0;
                    break;
                case 81:
                    this.freeze = !this.freeze
            }
        };
    this.onKeyUp = function (c) {
        switch (c.keyCode) {
            case 38:
            case 87:
                this.moveForward = !1;
                break;
            case 37:
            case 65:
                this.moveLeft = !1;
                break;
            case 40:
            case 83:
                this.moveBackward = !1;
                break;
            case 39:
            case 68:
                this.moveRight = !1
        }
    };
    this.update = function () {
        var c = (new Date).getTime();
        this.tdiff = (c - this.lastUpdate) /
            1E3;
        this.lastUpdate = c;
        if (!this.freeze) {
            this.autoSpeedFactor = this.heightSpeed ? this.tdiff * ((this.position.y < this.heightMin ? this.heightMin : this.position.y > this.heightMax ? this.heightMax : this.position.y) - this.heightMin) * this.heightCoef : 0;
            var f = this.tdiff * this.movementSpeed;
            (this.moveForward || this.autoForward && !this.moveBackward) && this.translateZ(-(f + this.autoSpeedFactor));
            this.moveBackward && this.translateZ(f);
            this.moveLeft && this.translateX(-f);
            this.moveRight && this.translateX(f);
            f = this.tdiff * this.lookSpeed;
            this.activeLook || (f = 0);
            this.lon += this.mouseX * f;
            this.lookVertical && (this.lat -= this.mouseY * f);
            this.lat = Math.max(-85, Math.min(85, this.lat));
            this.phi = (90 - this.lat) * Math.PI / 180;
            this.theta = this.lon * Math.PI / 180;
            c = this.target.position;
            var g = this.position;
            c.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
            c.y = g.y + 100 * Math.cos(this.phi);
            c.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta)
        }
        this.lon += this.mouseX * f;
        this.lookVertical && (this.lat -= this.mouseY * f);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi =
            (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;
        if (this.constrainVertical)this.phi = (this.phi - 0) * (this.verticalMax - this.verticalMin) / 3.14 + this.verticalMin;
        c = this.target.position;
        g = this.position;
        c.x = g.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        c.y = g.y + 100 * Math.cos(this.phi);
        c.z = g.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.supr.update.call(this)
    };
    this.domElement.addEventListener("contextmenu", function (c) {
        c.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", d(this,
        this.onMouseMove), !1);
    this.domElement.addEventListener("mousedown", d(this, this.onMouseDown), !1);
    this.domElement.addEventListener("mouseup", d(this, this.onMouseUp), !1);
    this.domElement.addEventListener("keydown", d(this, this.onKeyDown), !1);
    this.domElement.addEventListener("keyup", d(this, this.onKeyUp), !1)
};
THREE.QuakeCamera.prototype = new THREE.Camera;
THREE.QuakeCamera.prototype.constructor = THREE.QuakeCamera;
THREE.QuakeCamera.prototype.supr = THREE.Camera.prototype;
THREE.QuakeCamera.prototype.translate = function (b, d) {
    this.matrix.rotateAxis(d);
    if (this.noFly)d.y = 0;
    this.position.addSelf(d.multiplyScalar(b));
    this.target.position.addSelf(d.multiplyScalar(b))
};
THREE.PathCamera = function (b) {
    function d(o, t, u, w) {
        var p = {
            name: u,
            fps: 0.6,
            length: w,
            hierarchy: []
        }, A, I = t.getControlPointsArray(), H = t.getLength(), C = I.length, U = 0;
        A = C - 1;
        t = {parent: -1, keys: []};
        t.keys[0] = {time: 0, pos: I[0], rot: [0, 0, 0, 1], scl: [1, 1, 1]};
        t.keys[A] = {time: w, pos: I[A], rot: [0, 0, 0, 1], scl: [1, 1, 1]};
        for (A = 1; A < C - 1; A++) {
            U = w * H.chunks[A] / H.total;
            t.keys[A] = {time: U, pos: I[A]}
        }
        p.hierarchy[0] = t;
        THREE.AnimationHandler.add(p);
        return new THREE.Animation(o, u, THREE.AnimationHandler.CATMULLROM_FORWARD, !1)
    }

    function c(o, t) {
        var u,
            w, p = new THREE.Geometry;
        for (u = 0; u < o.points.length * t; u++) {
            w = u / (o.points.length * t);
            w = o.getPoint(w);
            p.vertices[u] = new THREE.Vertex(new THREE.Vector3(w.x, w.y, w.z))
        }
        return p
    }

    function f(o, t) {
        var u = c(t, 10), w = c(t, 10), p = new THREE.LineBasicMaterial({color: 16711680, linewidth: 3});
        lineObj = new THREE.Line(u, p);
        particleObj = new THREE.ParticleSystem(w, new THREE.ParticleBasicMaterial({color: 16755200, size: 3}));
        lineObj.scale.set(1, 1, 1);
        o.addChild(lineObj);
        particleObj.scale.set(1, 1, 1);
        o.addChild(particleObj);
        w = new THREE.Sphere(1,
            16, 8);
        p = new THREE.MeshBasicMaterial({color: 65280});
        for (i = 0; i < t.points.length; i++) {
            u = new THREE.Mesh(w, p);
            u.position.copy(t.points[i]);
            u.updateMatrix();
            o.addChild(u)
        }
    }

    THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
    this.id = "PathCamera" + THREE.PathCameraIdCounter++;
    this.duration = 1E4;
    this.waypoints = [];
    this.useConstantSpeed = !0;
    this.resamplingCoef = 50;
    this.debugPath = new THREE.Object3D;
    this.debugDummy = new THREE.Object3D;
    this.animationParent = new THREE.Object3D;
    this.lookSpeed = 0.005;
    this.lookVertical = !0;
    this.lookHorizontal = !0;
    this.verticalAngleMap = {srcRange: [0, 6.28], dstRange: [0, 6.28]};
    this.horizontalAngleMap = {srcRange: [0, 6.28], dstRange: [0, 6.28]};
    this.domElement = document;
    if (b) {
        if (b.duration !== undefined)this.duration = b.duration * 1E3;
        if (b.waypoints !== undefined)this.waypoints = b.waypoints;
        if (b.useConstantSpeed !== undefined)this.useConstantSpeed = b.useConstantSpeed;
        if (b.resamplingCoef !== undefined)this.resamplingCoef = b.resamplingCoef;
        if (b.createDebugPath !== undefined)this.createDebugPath = b.createDebugPath;
        if (b.createDebugDummy !== undefined)this.createDebugDummy = b.createDebugDummy;
        if (b.lookSpeed !== undefined)this.lookSpeed = b.lookSpeed;
        if (b.lookVertical !== undefined)this.lookVertical = b.lookVertical;
        if (b.lookHorizontal !== undefined)this.lookHorizontal = b.lookHorizontal;
        if (b.verticalAngleMap !== undefined)this.verticalAngleMap = b.verticalAngleMap;
        if (b.horizontalAngleMap !== undefined)this.horizontalAngleMap = b.horizontalAngleMap;
        if (b.domElement !== undefined)this.domElement = b.domElement
    }
    this.theta = this.phi = this.lon =
        this.lat = this.mouseY = this.mouseX = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    var g = Math.PI * 2, h = Math.PI / 180;
    this.update = function (o, t, u) {
        var w, p;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed);
        this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed);
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * h;
        this.theta = this.lon * h;
        w = this.phi % g;
        this.phi = w >= 0 ? w : w + g;
        w = this.verticalAngleMap.srcRange;
        p = this.verticalAngleMap.dstRange;
        this.phi = (this.phi - w[0]) * (p[1] - p[0]) / (w[1] - w[0]) + p[0];
        w = this.horizontalAngleMap.srcRange;
        p = this.horizontalAngleMap.dstRange;
        this.theta = (this.theta - w[0]) * (p[1] - p[0]) / (w[1] - w[0]) + p[0];
        w = this.target.position;
        w.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        w.y = 100 * Math.cos(this.phi);
        w.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.supr.update.call(this, o, t, u)
    };
    this.onMouseMove = function (o) {
        this.mouseX = o.clientX - this.windowHalfX;
        this.mouseY = o.clientY - this.windowHalfY
    };
    this.spline = new THREE.Spline;
    this.spline.initFromArray(this.waypoints);
    this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
    if (this.createDebugDummy) {
        b = new THREE.MeshLambertMaterial({color: 30719});
        var j = new THREE.MeshLambertMaterial({color: 65280}), k = new THREE.Cube(10, 10, 20), m = new THREE.Cube(2, 2, 10);
        this.animationParent = new THREE.Mesh(k, b);
        b = new THREE.Mesh(m, j);
        b.position.set(0, 10, 0);
        this.animation = d(this.animationParent, this.spline, this.id, this.duration);
        this.animationParent.addChild(this);
        this.animationParent.addChild(this.target);
        this.animationParent.addChild(b)
    } else {
        this.animation =
            d(this.animationParent, this.spline, this.id, this.duration);
        this.animationParent.addChild(this.target);
        this.animationParent.addChild(this)
    }
    this.createDebugPath && f(this.debugPath, this.spline);
    this.domElement.addEventListener("mousemove", function (o, t) {
        return function () {
            t.apply(o, arguments)
        }
    }(this, this.onMouseMove), !1)
};
THREE.PathCamera.prototype = new THREE.Camera;
THREE.PathCamera.prototype.constructor = THREE.PathCamera;
THREE.PathCamera.prototype.supr = THREE.Camera.prototype;
THREE.PathCameraIdCounter = 0;
THREE.FlyCamera = function (b) {
    function d(c, f) {
        return function () {
            f.apply(c, arguments)
        }
    }

    THREE.Camera.call(this, b.fov, b.aspect, b.near, b.far, b.target);
    this.tmpQuaternion = new THREE.Quaternion;
    this.movementSpeed = 1;
    this.rollSpeed = 0.005;
    this.dragToLook = !1;
    this.autoForward = !1;
    this.domElement = document;
    if (b) {
        if (b.movementSpeed !== undefined)this.movementSpeed = b.movementSpeed;
        if (b.rollSpeed !== undefined)this.rollSpeed = b.rollSpeed;
        if (b.dragToLook !== undefined)this.dragToLook = b.dragToLook;
        if (b.autoForward !== undefined)this.autoForward =
            b.autoForward;
        if (b.domElement !== undefined)this.domElement = b.domElement
    }
    this.useTarget = !1;
    this.useQuaternion = !0;
    this.mouseStatus = 0;
    this.moveState = {
        up: 0,
        down: 0,
        left: 0,
        right: 0,
        forward: 0,
        back: 0,
        pitchUp: 0,
        pitchDown: 0,
        yawLeft: 0,
        yawRight: 0,
        rollLeft: 0,
        rollRight: 0
    };
    this.moveVector = new THREE.Vector3(0, 0, 0);
    this.rotationVector = new THREE.Vector3(0, 0, 0);
    this.lastUpdate = -1;
    this.tdiff = 0;
    this.handleEvent = function (c) {
        if (typeof this[c.type] == "function")this[c.type](c)
    };
    this.keydown = function (c) {
        if (!c.altKey) {
            switch (c.keyCode) {
                case 16:
                    this.movementSpeedMultiplier =
                        0.1;
                    break;
                case 87:
                    this.moveState.forward = 1;
                    break;
                case 83:
                    this.moveState.back = 1;
                    break;
                case 65:
                    this.moveState.left = 1;
                    break;
                case 68:
                    this.moveState.right = 1;
                    break;
                case 82:
                    this.moveState.up = 1;
                    break;
                case 70:
                    this.moveState.down = 1;
                    break;
                case 38:
                    this.moveState.pitchUp = 1;
                    break;
                case 40:
                    this.moveState.pitchDown = 1;
                    break;
                case 37:
                    this.moveState.yawLeft = 1;
                    break;
                case 39:
                    this.moveState.yawRight = 1;
                    break;
                case 81:
                    this.moveState.rollLeft = 1;
                    break;
                case 69:
                    this.moveState.rollRight = 1
            }
            this.updateMovementVector();
            this.updateRotationVector()
        }
    };
    this.keyup = function (c) {
        switch (c.keyCode) {
            case 16:
                this.movementSpeedMultiplier = 1;
                break;
            case 87:
                this.moveState.forward = 0;
                break;
            case 83:
                this.moveState.back = 0;
                break;
            case 65:
                this.moveState.left = 0;
                break;
            case 68:
                this.moveState.right = 0;
                break;
            case 82:
                this.moveState.up = 0;
                break;
            case 70:
                this.moveState.down = 0;
                break;
            case 38:
                this.moveState.pitchUp = 0;
                break;
            case 40:
                this.moveState.pitchDown = 0;
                break;
            case 37:
                this.moveState.yawLeft = 0;
                break;
            case 39:
                this.moveState.yawRight = 0;
                break;
            case 81:
                this.moveState.rollLeft = 0;
                break;
            case 69:
                this.moveState.rollRight = 0
        }
        this.updateMovementVector();
        this.updateRotationVector()
    };
    this.mousedown = function (c) {
        c.preventDefault();
        c.stopPropagation();
        if (this.dragToLook)this.mouseStatus++; else switch (c.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
        }
    };
    this.mousemove = function (c) {
        if (!this.dragToLook || this.mouseStatus > 0) {
            var f = this.getContainerDimensions(), g = f.size[0] / 2, h = f.size[1] / 2;
            this.moveState.yawLeft = -(c.clientX - f.offset[0] - g) / g;
            this.moveState.pitchDown = (c.clientY -
                f.offset[1] - h) / h;
            this.updateRotationVector()
        }
    };
    this.mouseup = function (c) {
        c.preventDefault();
        c.stopPropagation();
        if (this.dragToLook) {
            this.mouseStatus--;
            this.moveState.yawLeft = this.moveState.pitchDown = 0
        } else switch (c.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
        }
        this.updateRotationVector()
    };
    this.update = function () {
        var c = (new Date).getTime();
        if (this.lastUpdate == -1)this.lastUpdate = c;
        this.tdiff = (c - this.lastUpdate) / 1E3;
        this.lastUpdate = c;
        c = this.tdiff * this.movementSpeed;
        var f = this.tdiff *
            this.rollSpeed;
        this.translateX(this.moveVector.x * c);
        this.translateY(this.moveVector.y * c);
        this.translateZ(this.moveVector.z * c);
        this.tmpQuaternion.set(this.rotationVector.x * f, this.rotationVector.y * f, this.rotationVector.z * f, 1).normalize();
        this.quaternion.multiplySelf(this.tmpQuaternion);
        this.matrix.setPosition(this.position);
        this.matrix.setRotationFromQuaternion(this.quaternion);
        this.matrixWorldNeedsUpdate = !0;
        this.supr.update.call(this)
    };
    this.updateMovementVector = function () {
        var c = this.moveState.forward ||
        this.autoForward && !this.moveState.back ? 1 : 0;
        this.moveVector.x = -this.moveState.left + this.moveState.right;
        this.moveVector.y = -this.moveState.down + this.moveState.up;
        this.moveVector.z = -c + this.moveState.back
    };
    this.updateRotationVector = function () {
        this.rotationVector.x = -this.moveState.pitchDown + this.moveState.pitchUp;
        this.rotationVector.y = -this.moveState.yawRight + this.moveState.yawLeft;
        this.rotationVector.z = -this.moveState.rollRight + this.moveState.rollLeft
    };
    this.getContainerDimensions = function () {
        return this.domElement !=
        document ? {
            size: [this.domElement.offsetWidth, this.domElement.offsetHeight],
            offset: [this.domElement.offsetLeft, this.domElement.offsetTop]
        } : {size: [window.innerWidth, window.innerHeight], offset: [0, 0]}
    };
    this.domElement.addEventListener("mousemove", d(this, this.mousemove), !1);
    this.domElement.addEventListener("mousedown", d(this, this.mousedown), !1);
    this.domElement.addEventListener("mouseup", d(this, this.mouseup), !1);
    window.addEventListener("keydown", d(this, this.keydown), !1);
    window.addEventListener("keyup", d(this,
        this.keyup), !1);
    this.updateMovementVector();
    this.updateRotationVector()
};
THREE.FlyCamera.prototype = new THREE.Camera;
THREE.FlyCamera.prototype.constructor = THREE.FlyCamera;
THREE.FlyCamera.prototype.supr = THREE.Camera.prototype;
THREE.RollCamera = function (b, d, c, f) {
    THREE.Camera.call(this, b, d, c, f);
    this.mouseLook = !0;
    this.autoForward = !1;
    this.rollSpeed = this.movementSpeed = this.lookSpeed = 1;
    this.constrainVertical = [-0.9, 0.9];
    this.domElement = document;
    this.useTarget = !1;
    this.matrixAutoUpdate = !1;
    this.forward = new THREE.Vector3(0, 0, 1);
    this.roll = 0;
    this.lastUpdate = -1;
    this.delta = 0;
    var g = new THREE.Vector3, h = new THREE.Vector3, j = new THREE.Vector3, k = new THREE.Matrix4, m = !1, o = 1, t = 0, u = 0, w = 0, p = 0, A = 0, I = window.innerWidth / 2, H = window.innerHeight / 2;
    this.update =
        function () {
            var C = (new Date).getTime();
            if (this.lastUpdate == -1)this.lastUpdate = C;
            this.delta = (C - this.lastUpdate) / 1E3;
            this.lastUpdate = C;
            if (this.mouseLook) {
                C = this.delta * this.lookSpeed;
                this.rotateHorizontally(C * p);
                this.rotateVertically(C * A)
            }
            C = this.delta * this.movementSpeed;
            this.translateZ(C * (t > 0 || this.autoForward && !(t < 0) ? 1 : t));
            this.translateX(C * u);
            this.translateY(C * w);
            m && (this.roll += this.rollSpeed * this.delta * o);
            if (this.forward.y > this.constrainVertical[1]) {
                this.forward.y = this.constrainVertical[1];
                this.forward.normalize()
            } else if (this.forward.y <
                this.constrainVertical[0]) {
                this.forward.y = this.constrainVertical[0];
                this.forward.normalize()
            }
            j.copy(this.forward);
            h.set(0, 1, 0);
            g.cross(h, j).normalize();
            h.cross(j, g).normalize();
            this.matrix.n11 = g.x;
            this.matrix.n12 = h.x;
            this.matrix.n13 = j.x;
            this.matrix.n21 = g.y;
            this.matrix.n22 = h.y;
            this.matrix.n23 = j.y;
            this.matrix.n31 = g.z;
            this.matrix.n32 = h.z;
            this.matrix.n33 = j.z;
            k.identity();
            k.n11 = Math.cos(this.roll);
            k.n12 = -Math.sin(this.roll);
            k.n21 = Math.sin(this.roll);
            k.n22 = Math.cos(this.roll);
            this.matrix.multiplySelf(k);
            this.matrixWorldNeedsUpdate = !0;
            this.matrix.n14 = this.position.x;
            this.matrix.n24 = this.position.y;
            this.matrix.n34 = this.position.z;
            this.supr.update.call(this)
        };
    this.translateX = function (C) {
        this.position.x += this.matrix.n11 * C;
        this.position.y += this.matrix.n21 * C;
        this.position.z += this.matrix.n31 * C
    };
    this.translateY = function (C) {
        this.position.x += this.matrix.n12 * C;
        this.position.y += this.matrix.n22 * C;
        this.position.z += this.matrix.n32 * C
    };
    this.translateZ = function (C) {
        this.position.x -= this.matrix.n13 * C;
        this.position.y -=
            this.matrix.n23 * C;
        this.position.z -= this.matrix.n33 * C
    };
    this.rotateHorizontally = function (C) {
        g.set(this.matrix.n11, this.matrix.n21, this.matrix.n31);
        g.multiplyScalar(C);
        this.forward.subSelf(g);
        this.forward.normalize()
    };
    this.rotateVertically = function (C) {
        h.set(this.matrix.n12, this.matrix.n22, this.matrix.n32);
        h.multiplyScalar(C);
        this.forward.addSelf(h);
        this.forward.normalize()
    };
    this.domElement.addEventListener("contextmenu", function (C) {
        C.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove",
        function (C) {
            p = (C.clientX - I) / window.innerWidth;
            A = (C.clientY - H) / window.innerHeight
        }, !1);
    this.domElement.addEventListener("mousedown", function (C) {
        C.preventDefault();
        C.stopPropagation();
        switch (C.button) {
            case 0:
                t = 1;
                break;
            case 2:
                t = -1
        }
    }, !1);
    this.domElement.addEventListener("mouseup", function (C) {
        C.preventDefault();
        C.stopPropagation();
        switch (C.button) {
            case 0:
                t = 0;
                break;
            case 2:
                t = 0
        }
    }, !1);
    this.domElement.addEventListener("keydown", function (C) {
        switch (C.keyCode) {
            case 38:
            case 87:
                t = 1;
                break;
            case 37:
            case 65:
                u = -1;
                break;
            case 40:
            case 83:
                t = -1;
                break;
            case 39:
            case 68:
                u = 1;
                break;
            case 81:
                m = !0;
                o = 1;
                break;
            case 69:
                m = !0;
                o = -1;
                break;
            case 82:
                w = 1;
                break;
            case 70:
                w = -1
        }
    }, !1);
    this.domElement.addEventListener("keyup", function (C) {
        switch (C.keyCode) {
            case 38:
            case 87:
                t = 0;
                break;
            case 37:
            case 65:
                u = 0;
                break;
            case 40:
            case 83:
                t = 0;
                break;
            case 39:
            case 68:
                u = 0;
                break;
            case 81:
                m = !1;
                break;
            case 69:
                m = !1;
                break;
            case 82:
                w = 0;
                break;
            case 70:
                w = 0
        }
    }, !1)
};
THREE.RollCamera.prototype = new THREE.Camera;
THREE.RollCamera.prototype.constructor = THREE.RollCamera;
THREE.RollCamera.prototype.supr = THREE.Camera.prototype;
THREE.Cube = function (b, d, c, f, g, h, j, k, m) {
    function o(H, C, U, D, V, O, R, la) {
        var da, oa, $ = f || 1, na = g || 1, e = V / 2, xa = O / 2, sa = t.vertices.length;
        if (H == "x" && C == "y" || H == "y" && C == "x")da = "z"; else if (H == "x" && C == "z" || H == "z" && C == "x") {
            da = "y";
            na = h || 1
        } else if (H == "z" && C == "y" || H == "y" && C == "z") {
            da = "x";
            $ = h || 1
        }
        var Da = $ + 1, fa = na + 1;
        V /= $;
        var ra = O / na;
        for (oa = 0; oa < fa; oa++)for (O = 0; O < Da; O++) {
            var ea = new THREE.Vector3;
            ea[H] = (O * V - e) * U;
            ea[C] = (oa * ra - xa) * D;
            ea[da] = R;
            t.vertices.push(new THREE.Vertex(ea))
        }
        for (oa = 0; oa < na; oa++)for (O = 0; O < $; O++) {
            t.faces.push(new THREE.Face4(O +
                Da * oa + sa, O + Da * (oa + 1) + sa, O + 1 + Da * (oa + 1) + sa, O + 1 + Da * oa + sa, null, null, la));
            t.faceVertexUvs[0].push([new THREE.UV(O / $, oa / na), new THREE.UV(O / $, (oa + 1) / na), new THREE.UV((O + 1) / $, (oa + 1) / na), new THREE.UV((O + 1) / $, oa / na)])
        }
    }

    THREE.Geometry.call(this);
    var t = this, u = b / 2, w = d / 2, p = c / 2;
    k = k ? -1 : 1;
    if (j !== undefined)if (j instanceof Array)this.materials = j; else {
        this.materials = [];
        for (var A = 0; A < 6; A++)this.materials.push([j])
    } else this.materials = [];
    this.sides = {px: !0, nx: !0, py: !0, ny: !0, pz: !0, nz: !0};
    if (m != undefined)for (var I in m)this.sides[I] !=
    undefined && (this.sides[I] = m[I]);
    this.sides.px && o("z", "y", 1 * k, -1, c, d, -u, this.materials[0]);
    this.sides.nx && o("z", "y", -1 * k, -1, c, d, u, this.materials[1]);
    this.sides.py && o("x", "z", 1 * k, 1, b, c, w, this.materials[2]);
    this.sides.ny && o("x", "z", 1 * k, -1, b, c, -w, this.materials[3]);
    this.sides.pz && o("x", "y", 1 * k, -1, b, d, p, this.materials[4]);
    this.sides.nz && o("x", "y", -1 * k, -1, b, d, -p, this.materials[5]);
    (function () {
        for (var H = [], C = [], U = 0, D = t.vertices.length; U < D; U++) {
            for (var V = t.vertices[U], O = !1, R = 0, la = H.length; R < la; R++) {
                var da =
                    H[R];
                if (V.position.x == da.position.x && V.position.y == da.position.y && V.position.z == da.position.z) {
                    C[U] = R;
                    O = !0;
                    break
                }
            }
            if (!O) {
                C[U] = H.length;
                H.push(new THREE.Vertex(V.position.clone()))
            }
        }
        U = 0;
        for (D = t.faces.length; U < D; U++) {
            V = t.faces[U];
            V.a = C[V.a];
            V.b = C[V.b];
            V.c = C[V.c];
            V.d = C[V.d]
        }
        t.vertices = H
    })();
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.Cube.prototype = new THREE.Geometry;
THREE.Cube.prototype.constructor = THREE.Cube;
THREE.Cylinder = function (b, d, c, f, g, h) {
    function j(w, p, A) {
        k.vertices.push(new THREE.Vertex(new THREE.Vector3(w, p, A)))
    }

    THREE.Geometry.call(this);
    var k = this, m, o = Math.PI * 2, t = f / 2;
    for (m = 0; m < b; m++)j(Math.sin(o * m / b) * d, Math.cos(o * m / b) * d, -t);
    for (m = 0; m < b; m++)j(Math.sin(o * m / b) * c, Math.cos(o * m / b) * c, t);
    for (m = 0; m < b; m++)k.faces.push(new THREE.Face4(m, m + b, b + (m + 1) % b, (m + 1) % b));
    if (c > 0) {
        j(0, 0, -t - (h || 0));
        for (m = b; m < b + b / 2; m++)k.faces.push(new THREE.Face4(2 * b, (2 * m - 2 * b) % b, (2 * m - 2 * b + 1) % b, (2 * m - 2 * b + 2) % b))
    }
    if (d > 0) {
        j(0, 0, t + (g || 0));
        for (m = b + b / 2; m < 2 * b; m++)k.faces.push(new THREE.Face4(2 * b + 1, (2 * m - 2 * b + 2) % b + b, (2 * m - 2 * b + 1) % b + b, (2 * m - 2 * b) % b + b))
    }
    m = 0;
    for (b = this.faces.length; m < b; m++) {
        d = [];
        c = this.faces[m];
        g = this.vertices[c.a];
        h = this.vertices[c.b];
        t = this.vertices[c.c];
        var u = this.vertices[c.d];
        d.push(new THREE.UV(0.5 + Math.atan2(g.position.x, g.position.y) / o, 0.5 + g.position.z / f));
        d.push(new THREE.UV(0.5 + Math.atan2(h.position.x, h.position.y) / o, 0.5 + h.position.z / f));
        d.push(new THREE.UV(0.5 + Math.atan2(t.position.x, t.position.y) / o, 0.5 + t.position.z /
            f));
        c instanceof THREE.Face4 && d.push(new THREE.UV(0.5 + Math.atan2(u.position.x, u.position.y) / o, 0.5 + u.position.z / f));
        this.faceVertexUvs[0].push(d)
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.Cylinder.prototype = new THREE.Geometry;
THREE.Cylinder.prototype.constructor = THREE.Cylinder;
THREE.Icosahedron = function (b) {
    function d(u, w, p) {
        var A = Math.sqrt(u * u + w * w + p * p);
        return g.vertices.push(new THREE.Vertex(new THREE.Vector3(u / A, w / A, p / A))) - 1
    }

    function c(u, w, p, A) {
        A.faces.push(new THREE.Face3(u, w, p))
    }

    function f(u, w) {
        var p = g.vertices[u].position, A = g.vertices[w].position;
        return d((p.x + A.x) / 2, (p.y + A.y) / 2, (p.z + A.z) / 2)
    }

    var g = this, h = new THREE.Geometry, j;
    this.subdivisions = b || 0;
    THREE.Geometry.call(this);
    b = (1 + Math.sqrt(5)) / 2;
    d(-1, b, 0);
    d(1, b, 0);
    d(-1, -b, 0);
    d(1, -b, 0);
    d(0, -1, b);
    d(0, 1, b);
    d(0, -1, -b);
    d(0,
        1, -b);
    d(b, 0, -1);
    d(b, 0, 1);
    d(-b, 0, -1);
    d(-b, 0, 1);
    c(0, 11, 5, h);
    c(0, 5, 1, h);
    c(0, 1, 7, h);
    c(0, 7, 10, h);
    c(0, 10, 11, h);
    c(1, 5, 9, h);
    c(5, 11, 4, h);
    c(11, 10, 2, h);
    c(10, 7, 6, h);
    c(7, 1, 8, h);
    c(3, 9, 4, h);
    c(3, 4, 2, h);
    c(3, 2, 6, h);
    c(3, 6, 8, h);
    c(3, 8, 9, h);
    c(4, 9, 5, h);
    c(2, 4, 11, h);
    c(6, 2, 10, h);
    c(8, 6, 7, h);
    c(9, 8, 1, h);
    for (b = 0; b < this.subdivisions; b++) {
        j = new THREE.Geometry;
        for (var k in h.faces) {
            var m = f(h.faces[k].a, h.faces[k].b), o = f(h.faces[k].b, h.faces[k].c), t = f(h.faces[k].c, h.faces[k].a);
            c(h.faces[k].a, m, t, j);
            c(h.faces[k].b, o, m, j);
            c(h.faces[k].c,
                t, o, j);
            c(m, o, t, j)
        }
        h.faces = j.faces
    }
    g.faces = h.faces;
    delete h;
    delete j;
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.Icosahedron.prototype = new THREE.Geometry;
THREE.Icosahedron.prototype.constructor = THREE.Icosahedron;
THREE.Lathe = function (b, d, c) {
    THREE.Geometry.call(this);
    this.steps = d || 12;
    this.angle = c || 2 * Math.PI;
    d = this.angle / this.steps;
    c = [];
    for (var f = [], g = [], h = [], j = (new THREE.Matrix4).setRotationZ(d), k = 0; k < b.length; k++) {
        this.vertices.push(new THREE.Vertex(b[k]));
        c[k] = b[k].clone();
        f[k] = this.vertices.length - 1
    }
    for (var m = 0; m <= this.angle + 0.001; m += d) {
        for (k = 0; k < c.length; k++)if (m < this.angle) {
            c[k] = j.multiplyVector3(c[k].clone());
            this.vertices.push(new THREE.Vertex(c[k]));
            g[k] = this.vertices.length - 1
        } else g = h;
        m == 0 && (h = f);
        for (k = 0; k < f.length - 1; k++) {
            this.faces.push(new THREE.Face4(g[k], g[k + 1], f[k + 1], f[k]));
            this.faceVertexUvs[0].push([new THREE.UV(1 - m / this.angle, k / b.length), new THREE.UV(1 - m / this.angle, (k + 1) / b.length), new THREE.UV(1 - (m - d) / this.angle, (k + 1) / b.length), new THREE.UV(1 - (m - d) / this.angle, k / b.length)])
        }
        f = g;
        g = []
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.Lathe.prototype = new THREE.Geometry;
THREE.Lathe.prototype.constructor = THREE.Lathe;
THREE.Plane = function (b, d, c, f) {
    THREE.Geometry.call(this);
    var g, h = b / 2, j = d / 2;
    c = c || 1;
    f = f || 1;
    var k = c + 1, m = f + 1;
    b /= c;
    var o = d / f;
    for (g = 0; g < m; g++)for (d = 0; d < k; d++)this.vertices.push(new THREE.Vertex(new THREE.Vector3(d * b - h, -(g * o - j), 0)));
    for (g = 0; g < f; g++)for (d = 0; d < c; d++) {
        this.faces.push(new THREE.Face4(d + k * g, d + k * (g + 1), d + 1 + k * (g + 1), d + 1 + k * g));
        this.faceVertexUvs[0].push([new THREE.UV(d / c, g / f), new THREE.UV(d / c, (g + 1) / f), new THREE.UV((d + 1) / c, (g + 1) / f), new THREE.UV((d + 1) / c, g / f)])
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
THREE.Plane.prototype = new THREE.Geometry;
THREE.Plane.prototype.constructor = THREE.Plane;
THREE.Sphere = function (b, d, c) {
    THREE.Geometry.call(this);
    var f, g = Math.PI, h = Math.max(3, d || 8), j = Math.max(2, c || 6);
    d = [];
    for (c = 0; c < j + 1; c++) {
        f = c / j;
        var k = b * Math.cos(f * g), m = b * Math.sin(f * g), o = [], t = 0;
        for (f = 0; f < h; f++) {
            var u = 2 * f / h, w = m * Math.sin(u * g);
            u = m * Math.cos(u * g);
            (c == 0 || c == j) && f > 0 || (t = this.vertices.push(new THREE.Vertex(new THREE.Vector3(u, k, w))) - 1);
            o.push(t)
        }
        d.push(o)
    }
    var p, A, I;
    g = d.length;
    for (c = 0; c < g; c++) {
        h = d[c].length;
        if (c > 0)for (f = 0; f < h; f++) {
            o = f == h - 1;
            j = d[c][o ? 0 : f + 1];
            k = d[c][o ? h - 1 : f];
            m = d[c - 1][o ? h - 1 : f];
            o = d[c -
            1][o ? 0 : f + 1];
            w = c / (g - 1);
            p = (c - 1) / (g - 1);
            A = (f + 1) / h;
            u = f / h;
            t = new THREE.UV(1 - A, w);
            w = new THREE.UV(1 - u, w);
            u = new THREE.UV(1 - u, p);
            var H = new THREE.UV(1 - A, p);
            if (c < d.length - 1) {
                p = this.vertices[j].position.clone();
                A = this.vertices[k].position.clone();
                I = this.vertices[m].position.clone();
                p.normalize();
                A.normalize();
                I.normalize();
                this.faces.push(new THREE.Face3(j, k, m, [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(A.x, A.y, A.z), new THREE.Vector3(I.x, I.y, I.z)]));
                this.faceVertexUvs[0].push([t, w, u])
            }
            if (c > 1) {
                p = this.vertices[j].position.clone();
                A = this.vertices[m].position.clone();
                I = this.vertices[o].position.clone();
                p.normalize();
                A.normalize();
                I.normalize();
                this.faces.push(new THREE.Face3(j, m, o, [new THREE.Vector3(p.x, p.y, p.z), new THREE.Vector3(A.x, A.y, A.z), new THREE.Vector3(I.x, I.y, I.z)]));
                this.faceVertexUvs[0].push([t, u, H])
            }
        }
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
    this.boundingSphere = {radius: b}
};
THREE.Sphere.prototype = new THREE.Geometry;
THREE.Sphere.prototype.constructor = THREE.Sphere;
THREE.Torus = function (b, d, c, f) {
    THREE.Geometry.call(this);
    this.radius = b || 100;
    this.tube = d || 40;
    this.segmentsR = c || 8;
    this.segmentsT = f || 6;
    b = [];
    for (d = 0; d <= this.segmentsR; ++d)for (c = 0; c <= this.segmentsT; ++c) {
        f = c / this.segmentsT * 2 * Math.PI;
        var g = d / this.segmentsR * 2 * Math.PI;
        this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius + this.tube * Math.cos(g)) * Math.cos(f), (this.radius + this.tube * Math.cos(g)) * Math.sin(f), this.tube * Math.sin(g))));
        b.push([c / this.segmentsT, 1 - d / this.segmentsR])
    }
    for (d = 1; d <= this.segmentsR; ++d)for (c =
                                                  1; c <= this.segmentsT; ++c) {
        f = (this.segmentsT + 1) * d + c;
        g = (this.segmentsT + 1) * d + c - 1;
        var h = (this.segmentsT + 1) * (d - 1) + c - 1, j = (this.segmentsT + 1) * (d - 1) + c;
        this.faces.push(new THREE.Face4(f, g, h, j));
        this.faceVertexUvs[0].push([new THREE.UV(b[f][0], b[f][1]), new THREE.UV(b[g][0], b[g][1]), new THREE.UV(b[h][0], b[h][1]), new THREE.UV(b[j][0], b[j][1])])
    }
    delete b;
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.Torus.prototype = new THREE.Geometry;
THREE.Torus.prototype.constructor = THREE.Torus;
THREE.TorusKnot = function (b, d, c, f, g, h, j) {
    function k(u, w, p, A, I, H) {
        w = p / A * u;
        p = Math.cos(w);
        return new THREE.Vector3(I * (2 + p) * 0.5 * Math.cos(u), I * (2 + p) * Math.sin(u) * 0.5, H * I * Math.sin(w) * 0.5)
    }

    THREE.Geometry.call(this);
    this.radius = b || 200;
    this.tube = d || 40;
    this.segmentsR = c || 64;
    this.segmentsT = f || 8;
    this.p = g || 2;
    this.q = h || 3;
    this.heightScale = j || 1;
    this.grid = Array(this.segmentsR);
    c = new THREE.Vector3;
    f = new THREE.Vector3;
    h = new THREE.Vector3;
    for (b = 0; b < this.segmentsR; ++b) {
        this.grid[b] = Array(this.segmentsT);
        for (d = 0; d < this.segmentsT; ++d) {
            var m =
                b / this.segmentsR * 2 * this.p * Math.PI;
            j = d / this.segmentsT * 2 * Math.PI;
            g = k(m, j, this.q, this.p, this.radius, this.heightScale);
            m = k(m + 0.01, j, this.q, this.p, this.radius, this.heightScale);
            c.x = m.x - g.x;
            c.y = m.y - g.y;
            c.z = m.z - g.z;
            f.x = m.x + g.x;
            f.y = m.y + g.y;
            f.z = m.z + g.z;
            h.cross(c, f);
            f.cross(h, c);
            h.normalize();
            f.normalize();
            m = -this.tube * Math.cos(j);
            j = this.tube * Math.sin(j);
            g.x += m * f.x + j * h.x;
            g.y += m * f.y + j * h.y;
            g.z += m * f.z + j * h.z;
            this.grid[b][d] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x, g.y, g.z))) - 1
        }
    }
    for (b = 0; b < this.segmentsR; ++b)for (d =
                                                 0; d < this.segmentsT; ++d) {
        f = (b + 1) % this.segmentsR;
        h = (d + 1) % this.segmentsT;
        g = this.grid[b][d];
        c = this.grid[f][d];
        f = this.grid[f][h];
        h = this.grid[b][h];
        j = new THREE.UV(b / this.segmentsR, d / this.segmentsT);
        m = new THREE.UV((b + 1) / this.segmentsR, d / this.segmentsT);
        var o = new THREE.UV((b + 1) / this.segmentsR, (d + 1) / this.segmentsT), t = new THREE.UV(b / this.segmentsR, (d + 1) / this.segmentsT);
        this.faces.push(new THREE.Face4(g, c, f, h));
        this.faceVertexUvs[0].push([j, m, o, t])
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
THREE.TorusKnot.prototype = new THREE.Geometry;
THREE.TorusKnot.prototype.constructor = THREE.TorusKnot;
THREE.Loader = function (b) {
    this.statusDomElement = (this.showStatus = b) ? THREE.Loader.prototype.addStatusElement() : null;
    this.onLoadStart = function () {
    };
    this.onLoadProgress = function () {
    };
    this.onLoadComplete = function () {
    }
};
THREE.Loader.prototype = {
    addStatusElement: function () {
        var b = document.createElement("div");
        b.style.position = "absolute";
        b.style.right = "0px";
        b.style.top = "0px";
        b.style.fontSize = "0.8em";
        b.style.textAlign = "left";
        b.style.background = "rgba(0,0,0,0.25)";
        b.style.color = "#fff";
        b.style.width = "120px";
        b.style.padding = "0.5em 0.5em 0.5em 0.5em";
        b.style.zIndex = 1E3;
        b.innerHTML = "Loading ...";
        return b
    }, updateProgress: function (b) {
        var d = "Loaded ";
        d += b.total ? (100 * b.loaded / b.total).toFixed(0) + "%" : (b.loaded / 1E3).toFixed(2) + " KB";
        this.statusDomElement.innerHTML = d
    }, extractUrlbase: function (b) {
        b = b.split("/");
        b.pop();
        return b.join("/")
    }, init_materials: function (b, d, c) {
        b.materials = [];
        for (var f = 0; f < d.length; ++f)b.materials[f] = [THREE.Loader.prototype.createMaterial(d[f], c)]
    }, createMaterial: function (b, d) {
        function c(k) {
            k = Math.log(k) / Math.LN2;
            return Math.floor(k) == k
        }

        function f(k, m) {
            var o = new Image;
            o.onload = function () {
                if (!c(this.width) || !c(this.height)) {
                    var t = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2)), u = Math.pow(2, Math.round(Math.log(this.height) /
                        Math.LN2));
                    k.image.width = t;
                    k.image.height = u;
                    k.image.getContext("2d").drawImage(this, 0, 0, t, u)
                } else k.image = this;
                k.needsUpdate = !0
            };
            o.src = m
        }

        var g, h, j;
        g = "MeshLambertMaterial";
        h = {color: 15658734, opacity: 1, map: null, lightMap: null, wireframe: b.wireframe};
        if (b.shading)if (b.shading == "Phong")g = "MeshPhongMaterial"; else b.shading == "Basic" && (g = "MeshBasicMaterial");
        if (b.blending)if (b.blending == "Additive")h.blending = THREE.AdditiveBlending; else if (b.blending == "Subtractive")h.blending = THREE.SubtractiveBlending; else if (b.blending ==
            "Multiply")h.blending = THREE.MultiplyBlending;
        if (b.transparent !== undefined || b.opacity < 1)h.transparent = b.transparent;
        if (b.depthTest !== undefined)h.depthTest = b.depthTest;
        if (b.vertexColors !== undefined)if (b.vertexColors == "face")h.vertexColors = THREE.FaceColors; else if (b.vertexColors)h.vertexColors = THREE.VertexColors;
        if (b.mapDiffuse && d) {
            j = document.createElement("canvas");
            h.map = new THREE.Texture(j);
            h.map.sourceFile = b.mapDiffuse;
            f(h.map, d + "/" + b.mapDiffuse)
        } else if (b.colorDiffuse) {
            j = (b.colorDiffuse[0] * 255 <<
                16) + (b.colorDiffuse[1] * 255 << 8) + b.colorDiffuse[2] * 255;
            h.color = j;
            h.opacity = b.transparency
        } else if (b.DbgColor)h.color = b.DbgColor;
        if (b.mapLightmap && d) {
            j = document.createElement("canvas");
            h.lightMap = new THREE.Texture(j);
            h.lightMap.sourceFile = b.mapLightmap;
            f(h.lightMap, d + "/" + b.mapLightmap)
        }
        return new THREE[g](h)
    }
};
THREE.JSONLoader = function (b) {
    THREE.Loader.call(this, b)
};
THREE.JSONLoader.prototype = new THREE.Loader;
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.supr = THREE.Loader.prototype;
THREE.JSONLoader.prototype.load = function (b) {
    var d = this, c = b.model, f = b.callback, g = b.texture_path ? b.texture_path : this.extractUrlbase(c);
    b = new Worker(c);
    b.onmessage = function (h) {
        d.createModel(h.data, f, g);
        d.onLoadComplete()
    };
    this.onLoadStart();
    b.postMessage((new Date).getTime())
};
THREE.JSONLoader.prototype.createModel = function (b, d, c) {
    var f = new THREE.Geometry, g = b.scale !== undefined ? 1 / b.scale : 1;
    this.init_materials(f, b.materials, c);
    (function (h) {
        if (b.version === undefined || b.version != 2)console.error("Deprecated file format."); else {
            var j, k, m, o, t, u, w, p, A, I, H, C, U, D, V = b.faces;
            u = b.vertices;
            var O = b.normals, R = b.colors, la = 0;
            for (j = 0; j < b.uvs.length; j++)b.uvs[j].length && la++;
            for (j = 0; j < la; j++) {
                f.faceUvs[j] = [];
                f.faceVertexUvs[j] = []
            }
            o = 0;
            for (t = u.length; o < t;) {
                w = new THREE.Vertex;
                w.position.x = u[o++] *
                    h;
                w.position.y = u[o++] * h;
                w.position.z = u[o++] * h;
                f.vertices.push(w)
            }
            o = 0;
            for (t = V.length; o < t;) {
                h = V[o++];
                u = h & 1;
                m = h & 2;
                j = h & 4;
                k = h & 8;
                p = h & 16;
                w = h & 32;
                I = h & 64;
                h &= 128;
                if (u) {
                    H = new THREE.Face4;
                    H.a = V[o++];
                    H.b = V[o++];
                    H.c = V[o++];
                    H.d = V[o++];
                    u = 4
                } else {
                    H = new THREE.Face3;
                    H.a = V[o++];
                    H.b = V[o++];
                    H.c = V[o++];
                    u = 3
                }
                if (m) {
                    m = V[o++];
                    H.materials = f.materials[m]
                }
                m = f.faces.length;
                if (j)for (j = 0; j < la; j++) {
                    C = b.uvs[j];
                    A = V[o++];
                    D = C[A * 2];
                    A = C[A * 2 + 1];
                    f.faceUvs[j][m] = new THREE.UV(D, A)
                }
                if (k)for (j = 0; j < la; j++) {
                    C = b.uvs[j];
                    U = [];
                    for (k = 0; k < u; k++) {
                        A = V[o++];
                        D = C[A * 2];
                        A = C[A * 2 + 1];
                        U[k] = new THREE.UV(D, A)
                    }
                    f.faceVertexUvs[j][m] = U
                }
                if (p) {
                    p = V[o++] * 3;
                    k = new THREE.Vector3;
                    k.x = O[p++];
                    k.y = O[p++];
                    k.z = O[p];
                    H.normal = k
                }
                if (w)for (j = 0; j < u; j++) {
                    p = V[o++] * 3;
                    k = new THREE.Vector3;
                    k.x = O[p++];
                    k.y = O[p++];
                    k.z = O[p];
                    H.vertexNormals.push(k)
                }
                if (I) {
                    w = V[o++];
                    w = new THREE.Color(R[w]);
                    H.color = w
                }
                if (h)for (j = 0; j < u; j++) {
                    w = V[o++];
                    w = new THREE.Color(R[w]);
                    H.vertexColors.push(w)
                }
                f.faces.push(H)
            }
        }
    })(g);
    (function () {
        var h, j, k, m;
        if (b.skinWeights) {
            h = 0;
            for (j = b.skinWeights.length; h < j; h += 2) {
                k = b.skinWeights[h];
                m = b.skinWeights[h + 1];
                f.skinWeights.push(new THREE.Vector4(k, m, 0, 0))
            }
        }
        if (b.skinIndices) {
            h = 0;
            for (j = b.skinIndices.length; h < j; h += 2) {
                k = b.skinIndices[h];
                m = b.skinIndices[h + 1];
                f.skinIndices.push(new THREE.Vector4(k, m, 0, 0))
            }
        }
        f.bones = b.bones;
        f.animation = b.animation
    })();
    (function (h) {
        if (b.morphTargets !== undefined) {
            var j, k, m, o, t, u, w, p, A;
            j = 0;
            for (k = b.morphTargets.length; j < k; j++) {
                f.morphTargets[j] = {};
                f.morphTargets[j].name = b.morphTargets[j].name;
                f.morphTargets[j].vertices = [];
                p = f.morphTargets[j].vertices;
                A = b.morphTargets[j].vertices;
                m = 0;
                for (o = A.length; m < o; m += 3) {
                    t = A[m] * h;
                    u = A[m + 1] * h;
                    w = A[m + 2] * h;
                    p.push(new THREE.Vertex(new THREE.Vector3(t, u, w)))
                }
            }
        }
        if (b.morphColors !== undefined) {
            j = 0;
            for (k = b.morphColors.length; j < k; j++) {
                f.morphColors[j] = {};
                f.morphColors[j].name = b.morphColors[j].name;
                f.morphColors[j].colors = [];
                o = f.morphColors[j].colors;
                t = b.morphColors[j].colors;
                h = 0;
                for (m = t.length; h < m; h += 3) {
                    u = new THREE.Color(16755200);
                    u.setRGB(t[h], t[h + 1], t[h + 2]);
                    o.push(u)
                }
            }
        }
    })(g);
    (function () {
        if (b.edges !== undefined) {
            var h, j, k;
            for (h = 0; h < b.edges.length; h +=
                2) {
                j = b.edges[h];
                k = b.edges[h + 1];
                f.edges.push(new THREE.Edge(f.vertices[j], f.vertices[k], j, k))
            }
        }
    })();
    f.computeFaceNormals();
    d(f)
};
THREE.BinaryLoader = function (b) {
    THREE.Loader.call(this, b)
};
THREE.BinaryLoader.prototype = new THREE.Loader;
THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader;
THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype;
THREE.BinaryLoader.prototype = {
    load: function (b) {
        var d = b.model, c = b.callback, f = b.texture_path ? b.texture_path : THREE.Loader.prototype.extractUrlbase(d), g = b.bin_path ? b.bin_path : THREE.Loader.prototype.extractUrlbase(d);
        b = (new Date).getTime();
        d = new Worker(d);
        var h = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
        d.onmessage = function (j) {
            THREE.BinaryLoader.prototype.loadAjaxBuffers(j.data.buffers, j.data.materials, c, g, f, h)
        };
        d.onerror = function (j) {
            alert("worker.onerror: " + j.message + "\n" + j.data);
            j.preventDefault()
        };
        d.postMessage(b)
    }, loadAjaxBuffers: function (b, d, c, f, g, h) {
        var j = new XMLHttpRequest, k = f + "/" + b, m = 0;
        j.onreadystatechange = function () {
            if (j.readyState == 4)j.status == 200 || j.status == 0 ? THREE.BinaryLoader.prototype.createBinModel(j.responseText, c, g, d) : alert("Couldn't load [" + k + "] [" + j.status + "]"); else if (j.readyState == 3) {
                if (h) {
                    m == 0 && (m = j.getResponseHeader("Content-Length"));
                    h({total: m, loaded: j.responseText.length})
                }
            } else j.readyState == 2 && (m = j.getResponseHeader("Content-Length"))
        };
        j.open("GET", k, !0);
        j.overrideMimeType("text/plain; charset=x-user-defined");
        j.setRequestHeader("Content-Type", "text/plain");
        j.send(null)
    }, createBinModel: function (b, d, c, f) {
        var g = function (h) {
            function j(N, Z) {
                var S = t(N, Z), T = t(N, Z + 1), Ma = t(N, Z + 2), db = t(N, Z + 3), n = (db << 1 & 255 | Ma >> 7) - 127;
                S |= (Ma & 127) << 16 | T << 8;
                if (S == 0 && n == -127)return 0;
                return (1 - 2 * (db >> 7)) * (1 + S * Math.pow(2, -23)) * Math.pow(2, n)
            }

            function k(N, Z) {
                var S = t(N, Z), T = t(N, Z + 1), Ma = t(N, Z + 2);
                return (t(N, Z + 3) << 24) + (Ma << 16) + (T << 8) + S
            }

            function m(N, Z) {
                var S = t(N, Z);
                return (t(N, Z + 1) << 8) + S
            }

            function o(N, Z) {
                var S = t(N, Z);
                return S > 127 ? S - 256 : S
            }

            function t(N,
                       Z) {
                return N.charCodeAt(Z) & 255
            }

            function u(N) {
                var Z, S, T;
                Z = k(b, N);
                S = k(b, N + R);
                T = k(b, N + la);
                N = m(b, N + da);
                THREE.BinaryLoader.prototype.f3(C, Z, S, T, N)
            }

            function w(N) {
                var Z, S, T, Ma, db, n;
                Z = k(b, N);
                S = k(b, N + R);
                T = k(b, N + la);
                Ma = m(b, N + da);
                db = k(b, N + oa);
                n = k(b, N + $);
                N = k(b, N + na);
                THREE.BinaryLoader.prototype.f3n(C, V, Z, S, T, Ma, db, n, N)
            }

            function p(N) {
                var Z, S, T, Ma;
                Z = k(b, N);
                S = k(b, N + e);
                T = k(b, N + xa);
                Ma = k(b, N + sa);
                N = m(b, N + Da);
                THREE.BinaryLoader.prototype.f4(C, Z, S, T, Ma, N)
            }

            function A(N) {
                var Z, S, T, Ma, db, n, E, y;
                Z = k(b, N);
                S = k(b, N + e);
                T = k(b, N +
                    xa);
                Ma = k(b, N + sa);
                db = m(b, N + Da);
                n = k(b, N + fa);
                E = k(b, N + ra);
                y = k(b, N + ea);
                N = k(b, N + za);
                THREE.BinaryLoader.prototype.f4n(C, V, Z, S, T, Ma, db, n, E, y, N)
            }

            function I(N) {
                var Z, S;
                Z = k(b, N);
                S = k(b, N + ma);
                N = k(b, N + ta);
                THREE.BinaryLoader.prototype.uv3(C.faceVertexUvs[0], O[Z * 2], O[Z * 2 + 1], O[S * 2], O[S * 2 + 1], O[N * 2], O[N * 2 + 1])
            }

            function H(N) {
                var Z, S, T;
                Z = k(b, N);
                S = k(b, N + pa);
                T = k(b, N + ja);
                N = k(b, N + Fa);
                THREE.BinaryLoader.prototype.uv4(C.faceVertexUvs[0], O[Z * 2], O[Z * 2 + 1], O[S * 2], O[S * 2 + 1], O[T * 2], O[T * 2 + 1], O[N * 2], O[N * 2 + 1])
            }

            var C = this, U = 0, D, V = [], O =
                [], R, la, da, oa, $, na, e, xa, sa, Da, fa, ra, ea, za, ma, ta, pa, ja, Fa, Aa, ga, ua, Ja, Ra, Wa;
            THREE.Geometry.call(this);
            THREE.Loader.prototype.init_materials(C, f, h);
            D = {
                signature: b.substr(U, 8),
                header_bytes: t(b, U + 8),
                vertex_coordinate_bytes: t(b, U + 9),
                normal_coordinate_bytes: t(b, U + 10),
                uv_coordinate_bytes: t(b, U + 11),
                vertex_index_bytes: t(b, U + 12),
                normal_index_bytes: t(b, U + 13),
                uv_index_bytes: t(b, U + 14),
                material_index_bytes: t(b, U + 15),
                nvertices: k(b, U + 16),
                nnormals: k(b, U + 16 + 4),
                nuvs: k(b, U + 16 + 8),
                ntri_flat: k(b, U + 16 + 12),
                ntri_smooth: k(b,
                    U + 16 + 16),
                ntri_flat_uv: k(b, U + 16 + 20),
                ntri_smooth_uv: k(b, U + 16 + 24),
                nquad_flat: k(b, U + 16 + 28),
                nquad_smooth: k(b, U + 16 + 32),
                nquad_flat_uv: k(b, U + 16 + 36),
                nquad_smooth_uv: k(b, U + 16 + 40)
            };
            U += D.header_bytes;
            R = D.vertex_index_bytes;
            la = D.vertex_index_bytes * 2;
            da = D.vertex_index_bytes * 3;
            oa = D.vertex_index_bytes * 3 + D.material_index_bytes;
            $ = D.vertex_index_bytes * 3 + D.material_index_bytes + D.normal_index_bytes;
            na = D.vertex_index_bytes * 3 + D.material_index_bytes + D.normal_index_bytes * 2;
            e = D.vertex_index_bytes;
            xa = D.vertex_index_bytes * 2;
            sa = D.vertex_index_bytes * 3;
            Da = D.vertex_index_bytes * 4;
            fa = D.vertex_index_bytes * 4 + D.material_index_bytes;
            ra = D.vertex_index_bytes * 4 + D.material_index_bytes + D.normal_index_bytes;
            ea = D.vertex_index_bytes * 4 + D.material_index_bytes + D.normal_index_bytes * 2;
            za = D.vertex_index_bytes * 4 + D.material_index_bytes + D.normal_index_bytes * 3;
            ma = D.uv_index_bytes;
            ta = D.uv_index_bytes * 2;
            pa = D.uv_index_bytes;
            ja = D.uv_index_bytes * 2;
            Fa = D.uv_index_bytes * 3;
            h = D.vertex_index_bytes * 3 + D.material_index_bytes;
            Wa = D.vertex_index_bytes * 4 + D.material_index_bytes;
            Aa = D.ntri_flat * h;
            ga = D.ntri_smooth * (h + D.normal_index_bytes * 3);
            ua = D.ntri_flat_uv * (h + D.uv_index_bytes * 3);
            Ja = D.ntri_smooth_uv * (h + D.normal_index_bytes * 3 + D.uv_index_bytes * 3);
            Ra = D.nquad_flat * Wa;
            h = D.nquad_smooth * (Wa + D.normal_index_bytes * 4);
            Wa = D.nquad_flat_uv * (Wa + D.uv_index_bytes * 4);
            U += function (N) {
                for (var Z, S, T, Ma = D.vertex_coordinate_bytes * 3, db = N + D.nvertices * Ma; N < db; N += Ma) {
                    Z = j(b, N);
                    S = j(b, N + D.vertex_coordinate_bytes);
                    T = j(b, N + D.vertex_coordinate_bytes * 2);
                    THREE.BinaryLoader.prototype.v(C, Z, S, T)
                }
                return D.nvertices *
                    Ma
            }(U);
            U += function (N) {
                for (var Z, S, T, Ma = D.normal_coordinate_bytes * 3, db = N + D.nnormals * Ma; N < db; N += Ma) {
                    Z = o(b, N);
                    S = o(b, N + D.normal_coordinate_bytes);
                    T = o(b, N + D.normal_coordinate_bytes * 2);
                    V.push(Z / 127, S / 127, T / 127)
                }
                return D.nnormals * Ma
            }(U);
            U += function (N) {
                for (var Z, S, T = D.uv_coordinate_bytes * 2, Ma = N + D.nuvs * T; N < Ma; N += T) {
                    Z = j(b, N);
                    S = j(b, N + D.uv_coordinate_bytes);
                    O.push(Z, S)
                }
                return D.nuvs * T
            }(U);
            Aa = U + Aa;
            ga = Aa + ga;
            ua = ga + ua;
            Ja = ua + Ja;
            Ra = Ja + Ra;
            h = Ra + h;
            Wa = h + Wa;
            (function (N) {
                var Z, S = D.vertex_index_bytes * 3 + D.material_index_bytes,
                    T = S + D.uv_index_bytes * 3, Ma = N + D.ntri_flat_uv * T;
                for (Z = N; Z < Ma; Z += T) {
                    u(Z);
                    I(Z + S)
                }
                return Ma - N
            })(ga);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 3 + D.material_index_bytes + D.normal_index_bytes * 3, T = S + D.uv_index_bytes * 3, Ma = N + D.ntri_smooth_uv * T;
                for (Z = N; Z < Ma; Z += T) {
                    w(Z);
                    I(Z + S)
                }
                return Ma - N
            })(ua);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 4 + D.material_index_bytes, T = S + D.uv_index_bytes * 4, Ma = N + D.nquad_flat_uv * T;
                for (Z = N; Z < Ma; Z += T) {
                    p(Z);
                    H(Z + S)
                }
                return Ma - N
            })(h);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 4 + D.material_index_bytes +
                    D.normal_index_bytes * 4, T = S + D.uv_index_bytes * 4, Ma = N + D.nquad_smooth_uv * T;
                for (Z = N; Z < Ma; Z += T) {
                    A(Z);
                    H(Z + S)
                }
                return Ma - N
            })(Wa);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 3 + D.material_index_bytes, T = N + D.ntri_flat * S;
                for (Z = N; Z < T; Z += S)u(Z);
                return T - N
            })(U);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 3 + D.material_index_bytes + D.normal_index_bytes * 3, T = N + D.ntri_smooth * S;
                for (Z = N; Z < T; Z += S)w(Z);
                return T - N
            })(Aa);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 4 + D.material_index_bytes, T = N + D.nquad_flat * S;
                for (Z = N; Z < T; Z += S)p(Z);
                return T -
                    N
            })(Ja);
            (function (N) {
                var Z, S = D.vertex_index_bytes * 4 + D.material_index_bytes + D.normal_index_bytes * 4, T = N + D.nquad_smooth * S;
                for (Z = N; Z < T; Z += S)A(Z);
                return T - N
            })(Ra);
            this.computeCentroids();
            this.computeFaceNormals()
        };
        g.prototype = new THREE.Geometry;
        g.prototype.constructor = g;
        d(new g(c))
    }, v: function (b, d, c, f) {
        b.vertices.push(new THREE.Vertex(new THREE.Vector3(d, c, f)))
    }, f3: function (b, d, c, f, g) {
        b.faces.push(new THREE.Face3(d, c, f, null, null, b.materials[g]))
    }, f4: function (b, d, c, f, g, h) {
        b.faces.push(new THREE.Face4(d,
            c, f, g, null, null, b.materials[h]))
    }, f3n: function (b, d, c, f, g, h, j, k, m) {
        h = b.materials[h];
        var o = d[k * 3], t = d[k * 3 + 1];
        k = d[k * 3 + 2];
        var u = d[m * 3], w = d[m * 3 + 1];
        m = d[m * 3 + 2];
        b.faces.push(new THREE.Face3(c, f, g, [new THREE.Vector3(d[j * 3], d[j * 3 + 1], d[j * 3 + 2]), new THREE.Vector3(o, t, k), new THREE.Vector3(u, w, m)], null, h))
    }, f4n: function (b, d, c, f, g, h, j, k, m, o, t) {
        j = b.materials[j];
        var u = d[m * 3], w = d[m * 3 + 1];
        m = d[m * 3 + 2];
        var p = d[o * 3], A = d[o * 3 + 1];
        o = d[o * 3 + 2];
        var I = d[t * 3], H = d[t * 3 + 1];
        t = d[t * 3 + 2];
        b.faces.push(new THREE.Face4(c, f, g, h, [new THREE.Vector3(d[k *
        3], d[k * 3 + 1], d[k * 3 + 2]), new THREE.Vector3(u, w, m), new THREE.Vector3(p, A, o), new THREE.Vector3(I, H, t)], null, j))
    }, uv3: function (b, d, c, f, g, h, j) {
        var k = [];
        k.push(new THREE.UV(d, c));
        k.push(new THREE.UV(f, g));
        k.push(new THREE.UV(h, j));
        b.push(k)
    }, uv4: function (b, d, c, f, g, h, j, k, m) {
        var o = [];
        o.push(new THREE.UV(d, c));
        o.push(new THREE.UV(f, g));
        o.push(new THREE.UV(h, j));
        o.push(new THREE.UV(k, m));
        b.push(o)
    }
};
THREE.SceneLoader = function () {
    this.onLoadStart = function () {
    };
    this.onLoadProgress = function () {
    };
    this.onLoadComplete = function () {
    };
    this.callbackSync = function () {
    };
    this.callbackProgress = function () {
    }
};
THREE.SceneLoader.prototype = {
    load: function (b, d) {
        var c = this, f = new Worker(b);
        f.postMessage(0);
        var g = THREE.Loader.prototype.extractUrlbase(b);
        f.onmessage = function (h) {
            function j(ma, ta) {
                return ta == "relativeToHTML" ? ma : g + "/" + ma
            }

            function k() {
                for (p in $.objects)if (!fa.objects[p]) {
                    U = $.objects[p];
                    if (U.geometry !== undefined) {
                        if (R = fa.geometries[U.geometry]) {
                            oa = [];
                            for (za = 0; za < U.materials.length; za++)oa[za] = fa.materials[U.materials[za]];
                            D = U.position;
                            r = U.rotation;
                            q = U.quaternion;
                            s = U.scale;
                            q = 0;
                            oa.length == 0 && (oa[0] =
                                new THREE.MeshFaceMaterial);
                            oa.length > 1 && (oa = [new THREE.MeshFaceMaterial]);
                            object = new THREE.Mesh(R, oa);
                            object.name = p;
                            object.position.set(D[0], D[1], D[2]);
                            if (q) {
                                object.quaternion.set(q[0], q[1], q[2], q[3]);
                                object.useQuaternion = !0
                            } else object.rotation.set(r[0], r[1], r[2]);
                            object.scale.set(s[0], s[1], s[2]);
                            object.visible = U.visible;
                            fa.scene.addObject(object);
                            fa.objects[p] = object;
                            if (U.meshCollider) {
                                var ma = THREE.CollisionUtils.MeshColliderWBox(object);
                                fa.scene.collisions.colliders.push(ma)
                            }
                            if (U.castsShadow) {
                                ma =
                                    new THREE.ShadowVolume(R);
                                fa.scene.addChild(ma);
                                ma.position = object.position;
                                ma.rotation = object.rotation;
                                ma.scale = object.scale
                            }
                            if (U.trigger && U.trigger.toLowerCase() != "none") {
                                ma = {type: U.trigger, object: U};
                                fa.triggers[object.name] = ma
                            }
                        }
                    } else {
                        D = U.position;
                        r = U.rotation;
                        q = U.quaternion;
                        s = U.scale;
                        q = 0;
                        object = new THREE.Object3D;
                        object.name = p;
                        object.position.set(D[0], D[1], D[2]);
                        if (q) {
                            object.quaternion.set(q[0], q[1], q[2], q[3]);
                            object.useQuaternion = !0
                        } else object.rotation.set(r[0], r[1], r[2]);
                        object.scale.set(s[0],
                            s[1], s[2]);
                        object.visible = U.visible !== undefined ? U.visible : !1;
                        fa.scene.addObject(object);
                        fa.objects[p] = object;
                        fa.empties[p] = object;
                        if (U.trigger && U.trigger.toLowerCase() != "none") {
                            ma = {type: U.trigger, object: U};
                            fa.triggers[object.name] = ma
                        }
                    }
                }
            }

            function m(ma) {
                return function (ta) {
                    fa.geometries[ma] = ta;
                    k();
                    e -= 1;
                    c.onLoadComplete();
                    t()
                }
            }

            function o(ma) {
                return function (ta) {
                    fa.geometries[ma] = ta
                }
            }

            function t() {
                c.callbackProgress({
                    totalModels: sa,
                    totalTextures: Da,
                    loadedModels: sa - e,
                    loadedTextures: Da - xa
                }, fa);
                c.onLoadProgress();
                e == 0 && xa == 0 && d(fa)
            }

            var u, w, p, A, I, H, C, U, D, V, O, R, la, da, oa, $, na, e, xa, sa, Da, fa;
            $ = h.data;
            h = new THREE.BinaryLoader;
            na = new THREE.JSONLoader;
            xa = e = 0;
            fa = {
                scene: new THREE.Scene,
                geometries: {},
                materials: {},
                textures: {},
                objects: {},
                cameras: {},
                lights: {},
                fogs: {},
                triggers: {},
                empties: {}
            };
            var ra = !1;
            for (p in $.objects) {
                U = $.objects[p];
                if (U.meshCollider) {
                    ra = !0;
                    break
                }
            }
            if (ra)fa.scene.collisions = new THREE.CollisionSystem;
            if ($.transform) {
                ra = $.transform.position;
                V = $.transform.rotation;
                var ea = $.transform.scale;
                ra && fa.scene.position.set(ra[0],
                    ra[1], ra[2]);
                V && fa.scene.rotation.set(V[0], V[1], V[2]);
                ea && fa.scene.scale.set(ea[0], ea[1], ea[2]);
                (ra || V || ea) && fa.scene.updateMatrix()
            }
            ra = function () {
                xa -= 1;
                t();
                c.onLoadComplete()
            };
            for (I in $.cameras) {
                V = $.cameras[I];
                if (V.type == "perspective")la = new THREE.Camera(V.fov, V.aspect, V.near, V.far); else if (V.type == "ortho") {
                    la = new THREE.Camera;
                    la.projectionMatrix = THREE.Matrix4.makeOrtho(V.left, V.right, V.top, V.bottom, V.near, V.far)
                }
                D = V.position;
                V = V.target;
                la.position.set(D[0], D[1], D[2]);
                la.target.position.set(V[0],
                    V[1], V[2]);
                fa.cameras[I] = la
            }
            for (A in $.lights) {
                I = $.lights[A];
                la = I.color !== undefined ? I.color : 16777215;
                V = I.intensity !== undefined ? I.intensity : 1;
                if (I.type == "directional") {
                    D = I.direction;
                    light = new THREE.DirectionalLight(la, V);
                    light.position.set(D[0], D[1], D[2]);
                    light.position.normalize()
                } else if (I.type == "point") {
                    D = I.position;
                    light = new THREE.PointLight(la, V);
                    light.position.set(D[0], D[1], D[2])
                }
                fa.scene.addLight(light);
                fa.lights[A] = light
            }
            for (H in $.fogs) {
                A = $.fogs[H];
                if (A.type == "linear")da = new THREE.Fog(0, A.near,
                    A.far); else A.type == "exp2" && (da = new THREE.FogExp2(0, A.density));
                V = A.color;
                da.color.setRGB(V[0], V[1], V[2]);
                fa.fogs[H] = da
            }
            if (fa.cameras && $.defaults.camera)fa.currentCamera = fa.cameras[$.defaults.camera];
            if (fa.fogs && $.defaults.fog)fa.scene.fog = fa.fogs[$.defaults.fog];
            V = $.defaults.bgcolor;
            fa.bgColor = new THREE.Color;
            fa.bgColor.setRGB(V[0], V[1], V[2]);
            fa.bgColorAlpha = $.defaults.bgalpha;
            for (u in $.geometries) {
                H = $.geometries[u];
                if (H.type == "bin_mesh" || H.type == "ascii_mesh") {
                    e += 1;
                    c.onLoadStart()
                }
            }
            sa = e;
            for (u in $.geometries) {
                H =
                    $.geometries[u];
                if (H.type == "cube") {
                    R = new THREE.Cube(H.width, H.height, H.depth, H.segmentsWidth, H.segmentsHeight, H.segmentsDepth, null, H.flipped, H.sides);
                    fa.geometries[u] = R
                } else if (H.type == "plane") {
                    R = new THREE.Plane(H.width, H.height, H.segmentsWidth, H.segmentsHeight);
                    fa.geometries[u] = R
                } else if (H.type == "sphere") {
                    R = new THREE.Sphere(H.radius, H.segmentsWidth, H.segmentsHeight);
                    fa.geometries[u] = R
                } else if (H.type == "cylinder") {
                    R = new THREE.Cylinder(H.numSegs, H.topRad, H.botRad, H.height, H.topOffset, H.botOffset);
                    fa.geometries[u] =
                        R
                } else if (H.type == "torus") {
                    R = new THREE.Torus(H.radius, H.tube, H.segmentsR, H.segmentsT);
                    fa.geometries[u] = R
                } else if (H.type == "icosahedron") {
                    R = new THREE.Icosahedron(H.subdivisions);
                    fa.geometries[u] = R
                } else if (H.type == "bin_mesh")h.load({
                    model: j(H.url, $.urlBaseType),
                    callback: m(u)
                }); else if (H.type == "ascii_mesh")na.load({
                    model: j(H.url, $.urlBaseType),
                    callback: m(u)
                }); else if (H.type == "embedded_mesh")(H = $.embeds[H.id]) && na.createModel(H, o(u), "")
            }
            for (C in $.textures) {
                u = $.textures[C];
                if (u.url instanceof Array) {
                    xa +=
                        u.url.length;
                    for (h = 0; h < u.url.length; h++)c.onLoadStart()
                } else {
                    xa += 1;
                    c.onLoadStart()
                }
            }
            Da = xa;
            for (C in $.textures) {
                u = $.textures[C];
                if (u.mapping != undefined && THREE[u.mapping] != undefined)u.mapping = new THREE[u.mapping];
                if (u.url instanceof Array) {
                    h = [];
                    for (var za = 0; za < u.url.length; za++)h[za] = j(u.url[za], $.urlBaseType);
                    h = THREE.ImageUtils.loadTextureCube(h, u.mapping, ra)
                } else {
                    h = THREE.ImageUtils.loadTexture(j(u.url, $.urlBaseType), u.mapping, ra);
                    if (THREE[u.minFilter] != undefined)h.minFilter = THREE[u.minFilter];
                    if (THREE[u.magFilter] !=
                        undefined)h.magFilter = THREE[u.magFilter]
                }
                fa.textures[C] = h
            }
            for (w in $.materials) {
                C = $.materials[w];
                for (O in C.parameters)if (O == "envMap" || O == "map" || O == "lightMap")C.parameters[O] = fa.textures[C.parameters[O]]; else if (O == "shading")C.parameters[O] = C.parameters[O] == "flat" ? THREE.FlatShading : THREE.SmoothShading; else if (O == "blending")C.parameters[O] = THREE[C.parameters[O]] ? THREE[C.parameters[O]] : THREE.NormalBlending; else if (O == "combine")C.parameters[O] = C.parameters[O] == "MixOperation" ? THREE.MixOperation : THREE.MultiplyOperation;
                else if (O == "vertexColors")if (C.parameters[O] == "face")C.parameters[O] = THREE.FaceColors; else if (C.parameters[O])C.parameters[O] = THREE.VertexColors;
                if (C.parameters.opacity !== undefined && C.parameters.opacity < 1)C.parameters.transparent = !0;
                C = new THREE[C.type](C.parameters);
                fa.materials[w] = C
            }
            k();
            c.callbackSync(fa)
        }
    }
};
THREE.MarchingCubes = function (b, d) {
    THREE.Object3D.call(this);
    this.materials = d instanceof Array ? d : [d];
    this.init = function (c) {
        this.isolation = 80;
        this.size = c;
        this.size2 = this.size * this.size;
        this.size3 = this.size2 * this.size;
        this.halfsize = this.size / 2;
        this.delta = 2 / this.size;
        this.yd = this.size;
        this.zd = this.size2;
        this.field = new Float32Array(this.size3);
        this.normal_cache = new Float32Array(this.size3 * 3);
        this.vlist = new Float32Array(36);
        this.nlist = new Float32Array(36);
        this.firstDraw = !0;
        this.maxCount = 4096;
        this.count =
            0;
        this.hasPos = !1;
        this.hasNormal = !1;
        this.positionArray = new Float32Array(this.maxCount * 3);
        this.normalArray = new Float32Array(this.maxCount * 3)
    };
    this.lerp = function (c, f, g) {
        return c + (f - c) * g
    };
    this.VIntX = function (c, f, g, h, j, k, m, o, t, u) {
        j = (j - t) / (u - t);
        t = this.normal_cache;
        f[h] = k + j * this.delta;
        f[h + 1] = m;
        f[h + 2] = o;
        g[h] = this.lerp(t[c], t[c + 3], j);
        g[h + 1] = this.lerp(t[c + 1], t[c + 4], j);
        g[h + 2] = this.lerp(t[c + 2], t[c + 5], j)
    };
    this.VIntY = function (c, f, g, h, j, k, m, o, t, u) {
        j = (j - t) / (u - t);
        t = this.normal_cache;
        f[h] = k;
        f[h + 1] = m + j * this.delta;
        f[h +
        2] = o;
        f = c + this.yd * 3;
        g[h] = this.lerp(t[c], t[f], j);
        g[h + 1] = this.lerp(t[c + 1], t[f + 1], j);
        g[h + 2] = this.lerp(t[c + 2], t[f + 2], j)
    };
    this.VIntZ = function (c, f, g, h, j, k, m, o, t, u) {
        j = (j - t) / (u - t);
        t = this.normal_cache;
        f[h] = k;
        f[h + 1] = m;
        f[h + 2] = o + j * this.delta;
        f = c + this.zd * 3;
        g[h] = this.lerp(t[c], t[f], j);
        g[h + 1] = this.lerp(t[c + 1], t[f + 1], j);
        g[h + 2] = this.lerp(t[c + 2], t[f + 2], j)
    };
    this.compNorm = function (c) {
        var f = c * 3;
        if (this.normal_cache[f] == 0) {
            this.normal_cache[f] = this.field[c - 1] - this.field[c + 1];
            this.normal_cache[f + 1] = this.field[c - this.yd] -
                this.field[c + this.yd];
            this.normal_cache[f + 2] = this.field[c - this.zd] - this.field[c + this.zd]
        }
    };
    this.polygonize = function (c, f, g, h, j, k) {
        var m = h + 1, o = h + this.yd, t = h + this.zd, u = m + this.yd, w = m + this.zd, p = h + this.yd + this.zd, A = m + this.yd + this.zd, I = 0, H = this.field[h], C = this.field[m], U = this.field[o], D = this.field[u], V = this.field[t], O = this.field[w], R = this.field[p], la = this.field[A];
        H < j && (I |= 1);
        C < j && (I |= 2);
        U < j && (I |= 8);
        D < j && (I |= 4);
        V < j && (I |= 16);
        O < j && (I |= 32);
        R < j && (I |= 128);
        la < j && (I |= 64);
        var da = THREE.edgeTable[I];
        if (da == 0)return 0;
        var oa = this.delta, $ = c + oa, na = f + oa;
        oa = g + oa;
        if (da & 1) {
            this.compNorm(h);
            this.compNorm(m);
            this.VIntX(h * 3, this.vlist, this.nlist, 0, j, c, f, g, H, C)
        }
        if (da & 2) {
            this.compNorm(m);
            this.compNorm(u);
            this.VIntY(m * 3, this.vlist, this.nlist, 3, j, $, f, g, C, D)
        }
        if (da & 4) {
            this.compNorm(o);
            this.compNorm(u);
            this.VIntX(o * 3, this.vlist, this.nlist, 6, j, c, na, g, U, D)
        }
        if (da & 8) {
            this.compNorm(h);
            this.compNorm(o);
            this.VIntY(h * 3, this.vlist, this.nlist, 9, j, c, f, g, H, U)
        }
        if (da & 16) {
            this.compNorm(t);
            this.compNorm(w);
            this.VIntX(t * 3, this.vlist, this.nlist,
                12, j, c, f, oa, V, O)
        }
        if (da & 32) {
            this.compNorm(w);
            this.compNorm(A);
            this.VIntY(w * 3, this.vlist, this.nlist, 15, j, $, f, oa, O, la)
        }
        if (da & 64) {
            this.compNorm(p);
            this.compNorm(A);
            this.VIntX(p * 3, this.vlist, this.nlist, 18, j, c, na, oa, R, la)
        }
        if (da & 128) {
            this.compNorm(t);
            this.compNorm(p);
            this.VIntY(t * 3, this.vlist, this.nlist, 21, j, c, f, oa, V, R)
        }
        if (da & 256) {
            this.compNorm(h);
            this.compNorm(t);
            this.VIntZ(h * 3, this.vlist, this.nlist, 24, j, c, f, g, H, V)
        }
        if (da & 512) {
            this.compNorm(m);
            this.compNorm(w);
            this.VIntZ(m * 3, this.vlist, this.nlist, 27, j, $,
                f, g, C, O)
        }
        if (da & 1024) {
            this.compNorm(u);
            this.compNorm(A);
            this.VIntZ(u * 3, this.vlist, this.nlist, 30, j, $, na, g, D, la)
        }
        if (da & 2048) {
            this.compNorm(o);
            this.compNorm(p);
            this.VIntZ(o * 3, this.vlist, this.nlist, 33, j, c, na, g, U, R)
        }
        I <<= 4;
        for (j = h = 0; THREE.triTable[I + j] != -1;) {
            c = I + j;
            f = c + 1;
            g = c + 2;
            this.posnormtriv(this.vlist, this.nlist, 3 * THREE.triTable[c], 3 * THREE.triTable[f], 3 * THREE.triTable[g], k);
            j += 3;
            h++
        }
        return h
    };
    this.posnormtriv = function (c, f, g, h, j, k) {
        var m = this.count * 3;
        this.positionArray[m] = c[g];
        this.positionArray[m + 1] = c[g +
        1];
        this.positionArray[m + 2] = c[g + 2];
        this.positionArray[m + 3] = c[h];
        this.positionArray[m + 4] = c[h + 1];
        this.positionArray[m + 5] = c[h + 2];
        this.positionArray[m + 6] = c[j];
        this.positionArray[m + 7] = c[j + 1];
        this.positionArray[m + 8] = c[j + 2];
        this.normalArray[m] = f[g];
        this.normalArray[m + 1] = f[g + 1];
        this.normalArray[m + 2] = f[g + 2];
        this.normalArray[m + 3] = f[h];
        this.normalArray[m + 4] = f[h + 1];
        this.normalArray[m + 5] = f[h + 2];
        this.normalArray[m + 6] = f[j];
        this.normalArray[m + 7] = f[j + 1];
        this.normalArray[m + 8] = f[j + 2];
        this.hasPos = !0;
        this.hasNormal = !0;
        this.count += 3;
        this.count >= this.maxCount - 3 && k(this)
    };
    this.begin = function () {
        this.count = 0;
        this.hasPos = !1;
        this.hasNormal = !1
    };
    this.end = function (c) {
        if (this.count != 0) {
            for (var f = this.count * 3; f < this.positionArray.length; f++)this.positionArray[f] = 0;
            c(this)
        }
    };
    this.addBall = function (c, f, g, h, j) {
        var k = this.size * Math.sqrt(h / j), m = g * this.size, o = f * this.size, t = c * this.size, u = Math.floor(m - k);
        u < 1 && (u = 1);
        m = Math.floor(m + k);
        m > this.size - 1 && (m = this.size - 1);
        var w = Math.floor(o - k);
        w < 1 && (w = 1);
        o = Math.floor(o + k);
        o > this.size - 1 && (o =
            this.size - 1);
        var p = Math.floor(t - k);
        p < 1 && (p = 1);
        k = Math.floor(t + k);
        k > this.size - 1 && (k = this.size - 1);
        for (var A, I, H, C, U, D; u < m; u++) {
            t = this.size2 * u;
            I = u / this.size - g;
            U = I * I;
            for (I = w; I < o; I++) {
                H = t + this.size * I;
                A = I / this.size - f;
                D = A * A;
                for (A = p; A < k; A++) {
                    C = A / this.size - c;
                    C = h / (1.0E-6 + C * C + D + U) - j;
                    C > 0 && (this.field[H + A] += C)
                }
            }
        }
    };
    this.addPlaneX = function (c, f) {
        var g, h, j, k, m, o = this.size, t = this.yd, u = this.zd, w = this.field, p = o * Math.sqrt(c / f);
        p > o && (p = o);
        for (g = 0; g < p; g++) {
            h = g / o;
            h *= h;
            k = c / (1.0E-4 + h) - f;
            if (k > 0)for (h = 0; h < o; h++) {
                m = g + h * t;
                for (j =
                         0; j < o; j++)w[u * j + m] += k
            }
        }
    };
    this.addPlaneY = function (c, f) {
        var g, h, j, k, m, o, t = this.size, u = this.yd, w = this.zd, p = this.field, A = t * Math.sqrt(c / f);
        A > t && (A = t);
        for (h = 0; h < A; h++) {
            g = h / t;
            g *= g;
            k = c / (1.0E-4 + g) - f;
            if (k > 0) {
                m = h * u;
                for (g = 0; g < t; g++) {
                    o = m + g;
                    for (j = 0; j < t; j++)p[w * j + o] += k
                }
            }
        }
    };
    this.addPlaneZ = function (c, f) {
        var g, h, j, k, m, o;
        size = this.size;
        yd = this.yd;
        zd = this.zd;
        field = this.field;
        dist = size * Math.sqrt(c / f);
        dist > size && (dist = size);
        for (j = 0; j < dist; j++) {
            g = j / size;
            g *= g;
            k = c / (1.0E-4 + g) - f;
            if (k > 0) {
                m = zd * j;
                for (h = 0; h < size; h++) {
                    o = m + h * yd;
                    for (g = 0; g < size; g++)field[o + g] += k
                }
            }
        }
    };
    this.reset = function () {
        var c;
        for (c = 0; c < this.size3; c++) {
            this.normal_cache[c * 3] = 0;
            this.field[c] = 0
        }
    };
    this.render = function (c) {
        this.begin();
        var f, g, h, j, k, m, o, t, u, w = this.size - 2;
        for (j = 1; j < w; j++) {
            u = this.size2 * j;
            o = (j - this.halfsize) / this.halfsize;
            for (h = 1; h < w; h++) {
                t = u + this.size * h;
                m = (h - this.halfsize) / this.halfsize;
                for (g = 1; g < w; g++) {
                    k = (g - this.halfsize) / this.halfsize;
                    f = t + g;
                    this.polygonize(k, m, o, f, this.isolation, c)
                }
            }
        }
        this.end(c)
    };
    this.generateGeometry = function () {
        var c = 0, f = new THREE.Geometry,
            g = [];
        this.render(function (h) {
            var j, k, m, o, t, u, w, p;
            for (j = 0; j < h.count; j++) {
                w = j * 3;
                t = w + 1;
                p = w + 2;
                k = h.positionArray[w];
                m = h.positionArray[t];
                o = h.positionArray[p];
                u = new THREE.Vector3(k, m, o);
                k = h.normalArray[w];
                m = h.normalArray[t];
                o = h.normalArray[p];
                w = new THREE.Vector3(k, m, o);
                w.normalize();
                t = new THREE.Vertex(u);
                f.vertices.push(t);
                g.push(w)
            }
            nfaces = h.count / 3;
            for (j = 0; j < nfaces; j++) {
                w = (c + j) * 3;
                t = w + 1;
                p = w + 2;
                u = g[w];
                k = g[t];
                m = g[p];
                w = new THREE.Face3(w, t, p, [u, k, m]);
                f.faces.push(w)
            }
            c += nfaces;
            h.count = 0
        });
        return f
    };
    this.init(b)
};
THREE.MarchingCubes.prototype = new THREE.Object3D;
THREE.MarchingCubes.prototype.constructor = THREE.MarchingCubes;
THREE.edgeTable = new Int32Array([0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107,
    1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170,
    419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0]);
THREE.triTable = new Int32Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2, 8, 4, 7,
    -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4, 8, 5,
    8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1,
    -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11, 10, 6,
    5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1,
    -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1, 8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1,
    10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1, 8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1, 8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1,
    6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1,
    8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1, 7,
    2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1, 6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1,
    -1, -1, -1, -1, 1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6,
    -1, -1, -1, -1, -1, -1, -1, 5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10,
    -1, 7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1, 0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1,
    -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1, 9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, 5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0, 11, 3, 4, 5, 11,
    2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1, 1, 10, 11, 1, 11,
    4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 7, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1, 1, 10,
    2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
THREE.Trident = function (b) {
    function d(h) {
        return new THREE.Mesh(new THREE.Cylinder(30, 0.1, b.length / 20, b.length / 5), new THREE.MeshBasicMaterial({color: h}))
    }

    function c(h, j) {
        var k = new THREE.Geometry;
        k.vertices = [new THREE.Vertex, new THREE.Vertex(h)];
        return new THREE.Line(k, new THREE.LineBasicMaterial({color: j}))
    }

    THREE.Object3D.call(this);
    var f = Math.PI / 2, g;
    b = b || THREE.Trident.defaultParams;
    if (b !== THREE.Trident.defaultParams)for (g in THREE.Trident.defaultParams)b.hasOwnProperty(g) || (b[g] = THREE.Trident.defaultParams[g]);
    this.scale = new THREE.Vector3(b.scale, b.scale, b.scale);
    this.addChild(c(new THREE.Vector3(b.length, 0, 0), b.xAxisColor));
    this.addChild(c(new THREE.Vector3(0, b.length, 0), b.yAxisColor));
    this.addChild(c(new THREE.Vector3(0, 0, b.length), b.zAxisColor));
    if (b.showArrows) {
        g = d(b.xAxisColor);
        g.rotation.y = -f;
        g.position.x = b.length;
        this.addChild(g);
        g = d(b.yAxisColor);
        g.rotation.x = f;
        g.position.y = b.length;
        this.addChild(g);
        g = d(b.zAxisColor);
        g.rotation.y = Math.PI;
        g.position.z = b.length;
        this.addChild(g)
    }
};
THREE.Trident.prototype = new THREE.Object3D;
THREE.Trident.prototype.constructor = THREE.Trident;
THREE.Trident.defaultParams = {
    xAxisColor: 16711680,
    yAxisColor: 65280,
    zAxisColor: 255,
    showArrows: !0,
    length: 100,
    scale: 1
};
THREE.PlaneCollider = function (b, d) {
    this.point = b;
    this.normal = d
};
THREE.SphereCollider = function (b, d) {
    this.center = b;
    this.radius = d;
    this.radiusSq = d * d
};
THREE.BoxCollider = function (b, d) {
    this.min = b;
    this.max = d;
    this.dynamic = !0;
    this.normal = new THREE.Vector3
};
THREE.MeshCollider = function (b, d, c, f) {
    this.vertices = b;
    this.faces = d;
    this.normals = c;
    this.box = f;
    this.numFaces = this.faces.length;
    this.normal = new THREE.Vector3
};
THREE.CollisionSystem = function () {
    this.collisionNormal = new THREE.Vector3;
    this.colliders = [];
    this.hits = []
};
THREE.Collisions = new THREE.CollisionSystem;
THREE.CollisionSystem.prototype.merge = function (b) {
    this.colliders = this.colliders.concat(b.colliders);
    this.hits = this.hits.concat(b.hits)
};
THREE.CollisionSystem.prototype.rayCastAll = function (b) {
    b.direction.normalize();
    this.hits.length = 0;
    var d, c, f, g, h = 0;
    d = 0;
    for (c = this.colliders.length; d < c; d++) {
        g = this.colliders[d];
        f = this.rayCast(b, g);
        if (f < Number.MAX_VALUE) {
            g.distance = f;
            f > h ? this.hits.push(g) : this.hits.unshift(g);
            h = f
        }
    }
    return this.hits
};
THREE.CollisionSystem.prototype.rayCastNearest = function (b) {
    var d = this.rayCastAll(b);
    if (d.length == 0)return null;
    for (var c = 0; d[c]instanceof THREE.MeshCollider;) {
        var f = this.rayMesh(b, d[c]);
        if (f < Number.MAX_VALUE) {
            d[c].distance = f;
            break
        }
        c++
    }
    if (c > d.length)return null;
    return d[c]
};
THREE.CollisionSystem.prototype.rayCast = function (b, d) {
    if (d instanceof THREE.PlaneCollider)return this.rayPlane(b, d); else if (d instanceof THREE.SphereCollider)return this.raySphere(b, d); else if (d instanceof THREE.BoxCollider)return this.rayBox(b, d); else if (d instanceof THREE.MeshCollider && d.box)return this.rayBox(b, d.box)
};
THREE.CollisionSystem.prototype.rayMesh = function (b, d) {
    for (var c = this.makeRayLocal(b, d.mesh), f = Number.MAX_VALUE, g = 0; g < d.numFaces / 3; g++) {
        var h = g * 3;
        h = this.rayTriangle(c, d.vertices[d.faces[h + 0]], d.vertices[d.faces[h + 1]], d.vertices[d.faces[h + 2]], f, this.collisionNormal);
        if (h < f) {
            f = h;
            d.normal.copy(this.collisionNormal);
            d.normal.normalize()
        }
    }
    return f
};
THREE.CollisionSystem.prototype.rayTriangle = function (b, d, c, f, g, h) {
    var j = THREE.CollisionSystem.__v1, k = THREE.CollisionSystem.__v2;
    h.set(0, 0, 0);
    j.sub(c, d);
    k.sub(f, c);
    h.cross(j, k);
    k = h.dot(b.direction);
    if (!(k < 0))return Number.MAX_VALUE;
    j = h.dot(d) - h.dot(b.origin);
    if (!(j <= 0))return Number.MAX_VALUE;
    if (!(j >= k * g))return Number.MAX_VALUE;
    j /= k;
    k = THREE.CollisionSystem.__v3;
    k.copy(b.direction);
    k.multiplyScalar(j);
    k.addSelf(b.origin);
    if (Math.abs(h.x) > Math.abs(h.y))if (Math.abs(h.x) > Math.abs(h.z)) {
        b = k.y - d.y;
        h = c.y -
            d.y;
        g = f.y - d.y;
        k = k.z - d.z;
        c = c.z - d.z;
        f = f.z - d.z
    } else {
        b = k.x - d.x;
        h = c.x - d.x;
        g = f.x - d.x;
        k = k.y - d.y;
        c = c.y - d.y;
        f = f.y - d.y
    } else if (Math.abs(h.y) > Math.abs(h.z)) {
        b = k.x - d.x;
        h = c.x - d.x;
        g = f.x - d.x;
        k = k.z - d.z;
        c = c.z - d.z;
        f = f.z - d.z
    } else {
        b = k.x - d.x;
        h = c.x - d.x;
        g = f.x - d.x;
        k = k.y - d.y;
        c = c.y - d.y;
        f = f.y - d.y
    }
    d = h * f - c * g;
    if (d == 0)return Number.MAX_VALUE;
    d = 1 / d;
    f = (b * f - k * g) * d;
    if (!(f >= 0))return Number.MAX_VALUE;
    d *= h * k - c * b;
    if (!(d >= 0))return Number.MAX_VALUE;
    if (!(1 - f - d >= 0))return Number.MAX_VALUE;
    return j
};
THREE.CollisionSystem.prototype.makeRayLocal = function (b, d) {
    var c = THREE.CollisionSystem.__m;
    THREE.Matrix4.makeInvert(d.matrixWorld, c);
    var f = THREE.CollisionSystem.__r;
    f.origin.copy(b.origin);
    f.direction.copy(b.direction);
    c.multiplyVector3(f.origin);
    c.rotateAxis(f.direction);
    f.direction.normalize();
    return f
};
THREE.CollisionSystem.prototype.rayBox = function (b, d) {
    var c;
    if (d.dynamic && d.mesh && d.mesh.matrixWorld)c = this.makeRayLocal(b, d.mesh); else {
        c = THREE.CollisionSystem.__r;
        c.origin.copy(b.origin);
        c.direction.copy(b.direction)
    }
    var f = 0, g = 0, h = 0, j = 0, k = 0, m = 0, o = !0;
    if (c.origin.x < d.min.x) {
        f = d.min.x - c.origin.x;
        f /= c.direction.x;
        o = !1;
        j = -1
    } else if (c.origin.x > d.max.x) {
        f = d.max.x - c.origin.x;
        f /= c.direction.x;
        o = !1;
        j = 1
    }
    if (c.origin.y < d.min.y) {
        g = d.min.y - c.origin.y;
        g /= c.direction.y;
        o = !1;
        k = -1
    } else if (c.origin.y > d.max.y) {
        g = d.max.y -
            c.origin.y;
        g /= c.direction.y;
        o = !1;
        k = 1
    }
    if (c.origin.z < d.min.z) {
        h = d.min.z - c.origin.z;
        h /= c.direction.z;
        o = !1;
        m = -1
    } else if (c.origin.z > d.max.z) {
        h = d.max.z - c.origin.z;
        h /= c.direction.z;
        o = !1;
        m = 1
    }
    if (o)return -1;
    o = 0;
    if (g > f) {
        o = 1;
        f = g
    }
    if (h > f) {
        o = 2;
        f = h
    }
    switch (o) {
        case 0:
            k = c.origin.y + c.direction.y * f;
            if (k < d.min.y || k > d.max.y)return Number.MAX_VALUE;
            c = c.origin.z + c.direction.z * f;
            if (c < d.min.z || c > d.max.z)return Number.MAX_VALUE;
            d.normal.set(j, 0, 0);
            break;
        case 1:
            j = c.origin.x + c.direction.x * f;
            if (j < d.min.x || j > d.max.x)return Number.MAX_VALUE;
            c = c.origin.z + c.direction.z * f;
            if (c < d.min.z || c > d.max.z)return Number.MAX_VALUE;
            d.normal.set(0, k, 0);
            break;
        case 2:
            j = c.origin.x + c.direction.x * f;
            if (j < d.min.x || j > d.max.x)return Number.MAX_VALUE;
            k = c.origin.y + c.direction.y * f;
            if (k < d.min.y || k > d.max.y)return Number.MAX_VALUE;
            d.normal.set(0, 0, m)
    }
    return f
};
THREE.CollisionSystem.prototype.rayPlane = function (b, d) {
    var c = b.direction.dot(d.normal), f = d.point.dot(d.normal);
    if (c < 0)c = (f - b.origin.dot(d.normal)) / c; else return Number.MAX_VALUE;
    return c > 0 ? c : Number.MAX_VALUE
};
THREE.CollisionSystem.prototype.raySphere = function (b, d) {
    var c = d.center.clone().subSelf(b.origin);
    if (c.lengthSq < d.radiusSq)return -1;
    var f = c.dot(b.direction.clone());
    if (f <= 0)return Number.MAX_VALUE;
    c = d.radiusSq - (c.lengthSq() - f * f);
    if (c >= 0)return Math.abs(f) - Math.sqrt(c);
    return Number.MAX_VALUE
};
THREE.CollisionSystem.__v1 = new THREE.Vector3;
THREE.CollisionSystem.__v2 = new THREE.Vector3;
THREE.CollisionSystem.__v3 = new THREE.Vector3;
THREE.CollisionSystem.__nr = new THREE.Vector3;
THREE.CollisionSystem.__m = new THREE.Matrix4;
THREE.CollisionSystem.__r = new THREE.Ray;
THREE.CollisionUtils = {};
THREE.CollisionUtils.MeshOBB = function (b) {
    b.geometry.computeBoundingBox();
    var d = b.geometry.boundingBox, c = new THREE.Vector3(d.x[0], d.y[0], d.z[0]);
    d = new THREE.Vector3(d.x[1], d.y[1], d.z[1]);
    c = new THREE.BoxCollider(c, d);
    c.mesh = b;
    return c
};
THREE.CollisionUtils.MeshAABB = function (b) {
    var d = THREE.CollisionUtils.MeshOBB(b);
    d.min.addSelf(b.position);
    d.max.addSelf(b.position);
    d.dynamic = !1;
    return d
};
THREE.CollisionUtils.MeshColliderWBox = function (b) {
    for (var d = b.geometry.vertices, c = d.length, f = b.geometry.faces, g = f.length, h = [], j = [], k = [], m = 0; m < c; m++)h.push(new THREE.Vector3(d[m].position.x, d[m].position.y, d[m].position.z));
    for (m = 0; m < g; m++) {
        j.push(f[m].a, f[m].b, f[m].c);
        k.push(new THREE.Vector3(f[m].normal.x, f[m].normal.y, f[m].normal.z))
    }
    d = new THREE.MeshCollider(h, j, k, THREE.CollisionUtils.MeshOBB(b));
    d.mesh = b;
    return d
};