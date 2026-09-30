// Removes the background from a photo using Apple's Vision framework.
// Usage: swift scripts/cutout.swift <input.jpg> <output.png>
import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count == 3 else {
  fputs("usage: swift cutout.swift <input> <output.png>\n", stderr)
  exit(2)
}
let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

let handler = VNImageRequestHandler(url: inURL, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()
do {
  try handler.perform([request])
} catch {
  fputs("vision failed: \(error)\n", stderr)
  exit(1)
}
guard let result = request.results?.first else {
  fputs("no foreground instance found\n", stderr)
  exit(1)
}

do {
  let buffer = try result.generateMaskedImage(
    ofInstances: result.allInstances,
    from: handler,
    croppedToInstancesExtent: true
  )
  let image = CIImage(cvPixelBuffer: buffer)
  let context = CIContext()
  guard
    let space = CGColorSpace(name: CGColorSpace.sRGB),
    let data = context.pngRepresentation(of: image, format: .RGBA8, colorSpace: space)
  else {
    fputs("could not encode png\n", stderr)
    exit(1)
  }
  try data.write(to: outURL)
  print("wrote \(outURL.path) (\(Int(image.extent.width))x\(Int(image.extent.height)))")
} catch {
  fputs("masking failed: \(error)\n", stderr)
  exit(1)
}
