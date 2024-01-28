import 'package:flutter/material.dart';
import 'dart:html';
import 'dart:ui' as ui;

void main() {
  ui.platformViewRegistry.registerViewFactory(
      'hello-world-html',
          (int viewId) => IFrameElement()
        ..width = '640'
        ..height = '360'
        ..src = 'assets/assets/splash.html'
        ..style.border = 'none');

  runApp(Directionality(
    textDirection: TextDirection.ltr,
    child: SizedBox(
      width: 640,
      height: 360,
      child: HtmlElementView(viewType: 'hello-world-html'),
    ),
  ));
}