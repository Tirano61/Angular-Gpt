import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { isFormControl } from '@angular/forms';

@Component({
  selector: 'app-gpt-message-editable-image',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gptMessageEditableImage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageEditableImageComponent implements AfterViewInit {
  
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string, alt: string };
  @ViewChild('canvas') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  @Output() onSelectImage = new EventEmitter<string>();

  public originalImage = signal<HTMLImageElement | null>( null );
  public isDrawing = signal<boolean>( false );
  public cords = signal<{ x: number, y: number }>({ x: 0, y: 0 });
  
  ngAfterViewInit(): void {
    isFormControl( !this.canvasElement.nativeElement );
    const canvas  = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    const image = new Image();
    
    image.crossOrigin = 'Anonymous';
    image.src = this.imageInfo.url;
    this.originalImage.set( image );

    image.onload = () => {
        if (context) {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
    }
  }

  onMouseDown(event: MouseEvent) {
    if(!this.canvasElement) return;
    this.isDrawing.set( true );
    const startX = event.clientX - this.canvasElement.nativeElement.getBoundingClientRect().left; 
    const startY = event.clientY - this.canvasElement.nativeElement.getBoundingClientRect().top;
    this.cords.set({ x: startX, y: startY });
  }

  onMouseMove(event: MouseEvent) {
    if( !this.isDrawing() || !this.canvasElement.nativeElement ) return;
    const canvasRef = this.canvasElement.nativeElement;
    const currentX = event.clientX - canvasRef.getBoundingClientRect().left; 
    const currentY = event.clientY - canvasRef.getBoundingClientRect().top;

    const width = currentX -this.cords().x;
    const height = currentY - this.cords().y;

    const canvasWidth = canvasRef.width;
    const canvasHeight = canvasRef.height;
    const context = canvasRef.getContext('2d')!;
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    context.drawImage(this.originalImage()!, 0, 0, canvasWidth, canvasHeight);

    //context.fillRect(this.cords().x, this.cords().y, width, height);
    context.clearRect(this.cords().x, this.cords().y, width, height);

  }

  onMouseUp() {
    this.isDrawing.set( false );
    const canvas = this.canvasElement.nativeElement;
    const url = canvas.toDataURL('image/png');

    this.onSelectImage.emit( url );
  }

  handleClick(){
    this.onSelectImage.emit( this.imageInfo.url );
  }
}
